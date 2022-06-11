/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useNavigationState, useRoute } from '@react-navigation/native'
import { useSelector } from '@src/common'
import { AddPostCard, NavigationBar, PostCard, StyledDivider } from '@src/components'
import { firestore } from '@src/config'
import { BOTTOM_TAB_BAR_HEIGHT, SCREEN_WIDTH } from '@src/constants'
import { Post, User } from '@src/models'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import { Icon, Spinner } from '@ui-kitten/components'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  LogBox,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileExtraInfo from './components/profileExtraInfo'
import ProfileInfo from './components/profileInfo'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  profileContainer: {
    width: SCREEN_WIDTH,
    paddingTop: 10
  },

  w_full: {
    width: '100%'
  },

  posts: {
    flex: 1,
    marginBottom: BOTTOM_TAB_BAR_HEIGHT + 50
  },
  spinnerContainer: { height: 40, width: '100%', alignItems: 'center' },
  extraInfoWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#FCFCFC'
  },
  touch_center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_extra_info: {
    fontSize: 18,
    fontWeight: '500'
  },
  btnEditProfile: {
    marginVertical: 5,
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

/**
 * 1 - Followed
 * 2 - Unfollow
 * 3 - User login Profile
 */
type UserInfo = {
  user: User
  followType: number
}

export default function ProfileScreen() {
  const ref = useRef<{
    currentTab: number
    currentGalleryTab: number
    headerHeight: number
    showHeaderTab: boolean
    prePopupImage: {
      pX: number
      pY: number
      w: number
      h: number
    }
  }>({
    showHeaderTab: false,
    headerHeight: 0,
    currentTab: 1,
    currentGalleryTab: 1,
    prePopupImage: { pX: 0, pY: 0, w: 0, h: 0 }
  })

  const headerTabOpacity = React.useMemo(() => new Animated.Value(-1), [])

  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.PROFILE>>()

  const loginUser = useSelector(state => state.user).user as User
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)

  const [photos, setPhotos] = useState<Post[]>([])

  const [loading, setLoading] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)

  useEffect(() => {
    setUserInfo({} as UserInfo)
    setPhotos([])
    if (route.params?.userId) {
      console.log('FETCH USER')
      const userRef = doc(firestore, 'users', route.params.userId)
      getDoc(userRef).then(value => {
        const user = value.data() as User
        const followType = loginUser.followingIDs?.some(id => id === user?.id) ? 1 : 2
        setUserInfo({ user, followType })
      })
    } else {
      setUserInfo({ user: loginUser, followType: 3 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params])

  useEffect(() => {
    async function fetchMyAPI() {
      console.log('RUN FETCH')

      setLoading(true)

      const queryString = query(
        collection(firestore, 'posts'),
        where('authorId', '==', userInfo?.user?.id)
      )
      const querySnapshot = await getDocs(queryString)

      const tempPostList: Post[] = []
      if (querySnapshot.empty) {
        setLoading(false)
        setPhotos(tempPostList)
      }
      querySnapshot.forEach(responseData => {
        console.log('DONE 1')
        const data = responseData.data()
        getDoc(data.creator).then(res => {
          data.creator = res.data() as User
          tempPostList.push(data as Post)
          console.log('DONE')
          setLoading(true)
          setPhotos(tempPostList)
        })
      })
    }
    console.log('RUN')
    if (userInfo.user) fetchMyAPI()
  }, [userInfo?.user])

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  const scrollHRef = useRef<ScrollView>(null)
  const scrollVRef = useRef<ScrollView>(null)

  // const onScrollEndDragContainerScroll = ({
  //   nativeEvent: {
  //     contentOffset: { x }
  //   }
  // }: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
  //     ref.current.currentTab = 2
  //     scrollHRef.current?.scrollTo({
  //       x: SCREEN_WIDTH / 2,
  //       y: 0,
  //       animated: true
  //     })
  //   } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
  //     ref.current.currentTab = 1
  //     scrollHRef.current?.scrollTo({
  //       x: 0,
  //       y: 0,
  //       animated: true
  //     })
  //   } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
  //     scrollHRef.current?.scrollTo({
  //       x: 0,
  //       y: 0,
  //       animated: true
  //     })
  //   } else if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
  //     scrollHRef.current?.scrollTo({
  //       x: SCREEN_WIDTH / 2,
  //       y: 0,
  //       animated: true
  //     })
  //   }
  // }
  // const onBackToMainScreen = () => {
  //   if (ref.current.currentTab === 2) {
  //     scrollHRef.current?.scrollTo({
  //       x: 0,
  //       y: 0,
  //       animated: true
  //     })
  //     ref.current.currentTab = 1
  //   }
  // }

  const onVerticalScrollViewScroll = ({
    nativeEvent: {
      contentOffset: { y }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (y > ref.current.headerHeight) {
      if (!ref.current.showHeaderTab) {
        headerTabOpacity.setValue(1)
        ref.current.showHeaderTab = true
      }
    } else {
      if (ref.current.showHeaderTab) {
        headerTabOpacity.setValue(-1)
        ref.current.showHeaderTab = false
      }
    }
  }

  const scrollToPosts = () => {
    scrollVRef.current?.scrollTo({
      x: 0,
      y: ref.current.headerHeight,
      animated: true
    })
  }

  const onSetHeaderHeight = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    ref.current.headerHeight = height
  }

  const handleLoadMore = async () => {}

  const renderFooter = () => {
    if (!loading || !hasMoreToLoad) return null
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    )
  }

  const onFollow = () => {
    loginUser.followingIDs?.push(userInfo?.user?.id)
    //Update login user following
    const userRef = doc(firestore, 'users', loginUser?.id)
    updateDoc(userRef, {
      followingIDs: loginUser.followingIDs
    })
  }

  const onUnfollow = () => {
    loginUser.followingIDs = loginUser.followingIDs?.filter(id => id !== userInfo?.user?.id)
    //Update login user following
    const userRef = doc(firestore, 'users', loginUser?.id)
    updateDoc(userRef, {
      followingIDs: loginUser.followingIDs
    })
  }

  const onClickFollow = () => {
    let tempFollowType: number = 3
    //follow => unfollow
    if (userInfo.followType === 1) {
      tempFollowType = 2
      onUnfollow()
    } else if (userInfo.followType === 2) {
      tempFollowType = 1
      onFollow()
    }
    setUserInfo({ user: userInfo.user, followType: tempFollowType })
  }

  return (
    <SafeAreaView style={styles.container}>
      {userInfo.user ? (
        <View style={styles.profileContainer}>
          <ScrollView
            ref={scrollVRef}
            onScroll={onVerticalScrollViewScroll}
            scrollEventThrottle={20}
            style={styles.w_full}
          >
            <TouchableOpacity activeOpacity={1}>
              <View onLayout={onSetHeaderHeight}>
                <ProfileExtraInfo user={userInfo.user} />
                <ProfileInfo user={userInfo.user} />
                {userInfo.followType === 3 ? null : (
                  <TouchableOpacity
                    onPress={onClickFollow}
                    activeOpacity={0.6}
                    style={styles.btnEditProfile}
                  >
                    {userInfo.followType === 1 ? (
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'green'
                        }}
                      >
                        Followed
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontWeight: '500',
                          color: 'black'
                        }}
                      >
                        Following
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
                <View style={styles.extraInfoWrapper}>
                  <TouchableOpacity onPress={scrollToPosts} style={styles.touch_center}>
                    <Text style={styles.text_extra_info}>{photos?.length}</Text>
                    <Text>Posts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigate(APP_SCREEN.FOLLOWING)
                    }}
                    style={styles.touch_center}
                  >
                    <Text style={styles.text_extra_info}>
                      {userInfo.user?.followingIDs?.length}
                    </Text>
                    <Text>Following</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#fff' }}>
                  <FlatList
                    data={photos}
                    showsVerticalScrollIndicator={false}
                    style={styles.posts}
                    // TODO:
                    // onRefresh
                    // ListEmptyComponent={ListEmpty}
                    keyExtractor={item => item?.id}
                    ItemSeparatorComponent={StyledDivider}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.5}
                    onEndReached={hasMoreToLoad ? handleLoadMore : null}
                    renderItem={({ item }) => <PostCard post={item} />}
                    ListHeaderComponent={<AddPostCard />}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  )
}
