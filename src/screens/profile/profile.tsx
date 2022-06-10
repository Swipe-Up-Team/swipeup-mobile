/* eslint-disable react-native/no-inline-styles */
import { useNavigationState } from '@react-navigation/native'
import { useSelector } from '@src/common'
import { AddPostCard, PostCard, StyledDivider } from '@src/components'
import { firestore } from '@src/config'
import { BOTTOM_TAB_BAR_HEIGHT, SCREEN_WIDTH } from '@src/constants'
import { Post, User } from '@src/models'
import { Spinner } from '@ui-kitten/components'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
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
    paddingTop: 24
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
    padding: 20,
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
    marginVertical: 10,
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

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

  const user = useSelector(state => state.user).user as User

  const [isFollow, setIsFollow] = useState(false)

  const [photos, setPhotos] = useState<Post[]>([])

  useEffect(() => {
    async function fetchMyAPI() {
      const queryString = query(collection(firestore, 'posts'), where('authorId', '==', user.id))
      const querySnapshot = await getDocs(queryString)

      const tempPostList: Post[] = []

      querySnapshot.forEach(responseData => {
        const data = responseData.data()
        getDoc(data.creator).then(res => {
          data.creator = res.data() as User
          tempPostList.push(data as Post)
          setPhotos(tempPostList)
        })
      })
    }
    fetchMyAPI()
  }, [user.id])

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
  const onBackToMainScreen = () => {
    if (ref.current.currentTab === 2) {
      scrollHRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
      ref.current.currentTab = 1
    }
  }

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

  const [loading, setLoading] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)

  const handleLoadMore = async () => {}

  const renderFooter = () => {
    if (!loading || !hasMoreToLoad) return null
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ScrollView
          ref={scrollVRef}
          onScroll={onVerticalScrollViewScroll}
          scrollEventThrottle={20}
          style={styles.w_full}
        >
          <TouchableOpacity activeOpacity={1} onPress={onBackToMainScreen}>
            <View onLayout={onSetHeaderHeight}>
              <ProfileExtraInfo user={user} />
              <ProfileInfo user={user} />
              <TouchableOpacity
                /**
                 * @todo On press
                 */
                onPress={() => setIsFollow(!isFollow)}
                activeOpacity={0.6}
                style={styles.btnEditProfile}
              >
                {isFollow ? (
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
              <View style={styles.extraInfoWrapper}>
                <TouchableOpacity onPress={scrollToPosts} style={styles.touch_center}>
                  <Text style={styles.text_extra_info}>{100}</Text>
                  <Text>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    /**
                     * @todo Add navigate
                     */
                    // navigate('Follow', { type: 2 })
                  }}
                  style={styles.touch_center}
                >
                  <Text style={styles.text_extra_info}>{user?.followingIDs?.length}</Text>
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
                  keyExtractor={item => item.id}
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
    </SafeAreaView>
  )
}
