/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { useDispatch } from 'react-redux'
import { useSelector } from '@src/common'
import { User } from '@src/models'
import { DEFAULT_PHOTO_URI, SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/constants'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { Icon } from '@ui-kitten/components'
import { reloadUser } from '@src/store/reducers/user-reducer'
import { AppDispatch } from '@src/store/store'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '@src/config'
import { APP_SCREEN } from '@src/navigation/screen-types'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // marginTop: 24,
    backgroundColor: '#fff'
  },
  navigationBar: {
    height: 88,
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 2
  },
  btnGoBack: {
    height: 44,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    height: 44,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabContainer: {
    width: SCREEN_WIDTH
  },
  tabLine: {
    position: 'absolute',
    height: 2,
    width: SCREEN_WIDTH / 2,
    backgroundColor: '#333',
    top: '100%',
    zIndex: 1
  },
  userItem: {
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnFollow: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: '#333',
    borderWidth: 0.3
  },
  confirmWrapper: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    paddingTop: 15,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  btnConfirm: {
    borderTopColor: '#ddd',
    borderTopWidth: 0.5,
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerList: {
    padding: 15,
    paddingBottom: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.3
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#318bfb'
  }
})

/**
 * followType
 * 1:Following
 * 2:Aren't Following
 * 3:Requested
 */
export type MixedUserInfo = User & {
  followType?: 1 | 2 | 3
}

const Follow = () => {
  const dispatch = useDispatch<AppDispatch>()
  const type = 2
  const user = useSelector(state => state.user).user as User
  const [followingQuery, setFollowingQuery] = useState<string>('')
  const username = user?.name
  const [selectedUnfollowIndex, setSelectedUnfollowIndex] = useState<number>(-1)
  const [selectedFollowingIndex, setSelectedFollowingIndex] = useState<number>(-1)
  const [followings, setFollowings] = useState<MixedUserInfo[]>([])
  const [follwingsRenderList, setFollowingsRenderList] = useState<MixedUserInfo[]>([])
  const scrollRef = useRef<ScrollView>(null)
  const tabLineOffsetX = React.useMemo(
    () => new Animated.Value(((type - 1) * SCREEN_WIDTH) / 2),
    []
  )
  const ref = useRef<{
    followerQueryTimeout: NodeJS.Timeout
    followingQueryTimeout: NodeJS.Timeout
    currentTab: 1 | 2
  }>({
    currentTab: type,
    followerQueryTimeout: setTimeout(() => {}, 0),
    followingQueryTimeout: setTimeout(() => {}, 0)
  })

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSwitchTab = (type: 1 | 2) => {
    if (type === 2 && ref.current.currentTab === 1) {
      ref.current.currentTab = type
      scrollRef.current?.scrollTo({
        y: 0,
        x: SCREEN_WIDTH,
        animated: true
      })
      return Animated.timing(tabLineOffsetX, {
        toValue: SCREEN_WIDTH / 2,
        useNativeDriver: false,
        duration: 200
      }).start()
    }
    if (type === 1 && ref.current.currentTab === 2) {
      ref.current.currentTab = type
      scrollRef.current?.scrollTo({
        y: 0,
        x: 0,
        animated: true
      })
      return Animated.timing(tabLineOffsetX, {
        toValue: 0,
        useNativeDriver: false,
        duration: 200
      }).start()
    }
  }

  const onUnFollow = (index: number) => {
    let temp = [...follwingsRenderList]
    if (follwingsRenderList[index].followType === 1) {
      setSelectedUnfollowIndex(index)
    } else {
      temp[index].followType = 1
      const followingIDs: string[] = []
      temp.forEach(value => {
        if (value.followType === 1) followingIDs.push(value.id)
      })
      const userRef = doc(firestore, 'users', user.id)
      updateDoc(userRef, {
        followingIDs
      })
    }
    setFollowings(temp)
    setFollowingsRenderList(temp)
  }

  /**
   * @todo Change this
   */
  useEffect(() => {
    const data: MixedUserInfo[] = []
    dispatch(reloadUser(user.id)).then(() => {
      user.followingIDs?.forEach(async (value, index, array) => {
        const userRef = doc(firestore, 'users', value)
        await getDoc(userRef).then(valueSnap =>
          data.push({ ...(valueSnap.data() as User), followType: 1 })
        )
        if (index === array.length - 1)
          return Promise.resolve().then(() => {
            setFollowings(data)
            setFollowingsRenderList(data)
          })
      })
    })
  }, [])

  useEffect(() => {
    if (followingQuery.length > 0) {
      const temp = [...followings].filter(
        usr => usr.name && usr.name.indexOf(followingQuery.toLowerCase()) > -1
      )
      setFollowingsRenderList(temp)
    } else setFollowingsRenderList([...followings])
  }, [followingQuery])

  const onConfirmUnFollow = (id: string) => {
    const newFollowingList = follwingsRenderList.filter(following => following.id !== id)

    const followingIDs: string[] = []
    newFollowingList.forEach(value => followingIDs.push(value.id))

    const userRef = doc(firestore, 'users', user.id)
    updateDoc(userRef, {
      followingIDs
    })

    setSelectedUnfollowIndex(-1)
    let temp = [...follwingsRenderList]
    temp = temp.map(usr => {
      if (usr.id === id) {
        usr.followType = 2
      }
      return usr
    })
    setFollowings(temp)
    setFollowingsRenderList(temp)
  }

  const onScrollEndDrag = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (x > SCREEN_WIDTH / 2) {
      scrollRef.current?.scrollTo({
        y: 0,
        x: SCREEN_WIDTH,
        animated: true
      })
      if (ref.current.currentTab === 1) {
        Animated.timing(tabLineOffsetX, {
          toValue: SCREEN_WIDTH / 2,
          useNativeDriver: false,
          duration: 200
        }).start()
      }
      ref.current.currentTab = 2
    } else {
      scrollRef.current?.scrollTo({
        y: 0,
        x: 0,
        animated: true
      })
      if (ref.current.currentTab === 2) {
        Animated.timing(tabLineOffsetX, {
          toValue: 0,
          useNativeDriver: false,
          duration: 200
        }).start()
      }
      ref.current.currentTab = 1
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {selectedFollowingIndex > -1 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={setSelectedFollowingIndex.bind(null, -1)}
          style={styles.confirmWrapper}
        >
          <View style={{ ...styles.confirmBox, paddingTop: 0, borderRadius: 5 }}>
            <TouchableOpacity
              onPress={() => {
                setSelectedFollowingIndex(-1)
                // navigate('NotificationOptions', {
                //   user: follwingsRenderList[selectedFollowingIndex]
                // })
              }}
              style={{
                paddingHorizontal: 15,
                height: 44,
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontWeight: '500' }}>Manage Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedFollowingIndex(-1)
                // navigate('MuteOptions', {
                //   user: follwingsRenderList[selectedFollowingIndex]
                // })
              }}
              style={{
                paddingHorizontal: 15,
                height: 44,
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontWeight: '500' }}>Muted</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      {selectedUnfollowIndex > -1 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={setSelectedUnfollowIndex.bind(null, -1)}
          style={styles.confirmWrapper}
        >
          <View style={styles.confirmBox}>
            <ExpoFastImage
              style={styles.avatar}
              source={{
                uri: follwingsRenderList[selectedUnfollowIndex].avatar || DEFAULT_PHOTO_URI
              }}
            />
            <Text
              style={{
                marginTop: 15,
                fontSize: 20,
                fontWeight: '600'
              }}
            >
              Are You Sure?
            </Text>
            <Text
              style={{
                color: '#666',
                textAlign: 'center',
                marginBottom: 20,
                marginHorizontal: 15
              }}
            >
              Are you sure to unfollow @{follwingsRenderList[selectedUnfollowIndex].name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                onConfirmUnFollow(follwingsRenderList[selectedUnfollowIndex].id || '')
              }}
              style={styles.btnConfirm}
            >
              <Text
                style={{
                  color: '#318bfb',
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >
                Unfollow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={setSelectedUnfollowIndex.bind(null, -1)}
              style={styles.btnConfirm}
            >
              <Text
                style={{
                  fontSize: 16
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.navigationBar}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 44
          }}
        >
          <TouchableOpacity
            onPress={() => {
              goBack()
            }}
            style={styles.btnGoBack}
          >
            <Icon name="arrow-back" width={20} height={20} fill="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500'
            }}
          >
            {username}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 44
          }}
        >
          <TouchableOpacity onPress={() => onSwitchTab(1)} style={styles.tab}>
            <Text
              style={{
                fontWeight: '500'
              }}
            >
              Follower
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSwitchTab(2)} style={styles.tab}>
            <Text
              style={{
                fontWeight: '500'
              }}
            >
              Following
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={{
              ...styles.tabLine,
              left: tabLineOffsetX
            }}
          />
        </View>
      </View>
      <ScrollView
        // onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={30}
        ref={scrollRef}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.tabContainer}>
          <FlatList
            data={follwingsRenderList}
            ListHeaderComponent={
              <>
                <View style={styles.headerList}>
                  <View style={styles.searchWrapper}>
                    <View
                      style={{
                        height: 44,
                        width: 44,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon name="search" width={20} height={20} fill="#666" />
                    </View>
                    <TextInput
                      style={{
                        height: '100%',
                        width: SCREEN_WIDTH - 30 - 44
                      }}
                      autoCapitalize="none"
                      value={followingQuery}
                      onChangeText={setFollowingQuery}
                      placeholder="Search followings"
                    />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      margin: 15,
                      marginBottom: 5,
                      fontSize: 16,
                      fontWeight: '600'
                    }}
                  >
                    All Followings
                  </Text>
                </View>
              </>
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigate(APP_SCREEN.PROFILE, {
                    userId: item.id
                  })
                }}
                style={styles.userItem}
              >
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <ExpoFastImage
                    style={{
                      height: 64,
                      width: 64,
                      borderRadius: 32,
                      borderColor: '#333',
                      borderWidth: 0.3
                    }}
                    source={{
                      uri: item.avatar || DEFAULT_PHOTO_URI
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontWeight: '500'
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={onUnFollow.bind(null, index)}
                    style={{
                      ...styles.btnFollow,
                      ...(item.followType === 1
                        ? {}
                        : {
                            borderWidth: 0,
                            backgroundColor: '#318bfb'
                          })
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '600',
                        ...(item.followType === 1
                          ? {
                              color: '#000'
                            }
                          : {
                              color: '#fff'
                            })
                      }}
                    >
                      {item.followType === 1
                        ? 'Following'
                        : item.followType === 2
                        ? 'Follow'
                        : 'Requested'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={setSelectedFollowingIndex.bind(null, index)}
                    style={{
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Icon name="more-vertical" width={20} height={20} fill="#000" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Follow
