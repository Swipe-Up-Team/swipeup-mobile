import { useSelector } from '@src/common'
import { firestore } from '@src/config'
import { SCREEN_WIDTH } from '@src/constants'
import { Post, User } from '@src/models'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import PopupImage from './components/popupImage'
import ProfileExtraInfo from './components/profileExtraInfo'
import ProfileGallery from './components/profileGallery'
import ProfileInfo from './components/profileInfo'
import ProfileRecommend from './components/profileRecommend'

export interface PopupImageLocation {
  popupImageTop: Animated.Value
  popupImageLeft: Animated.Value
  popupImageWidth: Animated.Value
  popupImageHeight: Animated.Value
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(250,250,250)',
    width: '100%',
    height: '100%'
  },
  profileContainer: {
    width: SCREEN_WIDTH,
    paddingTop: 24
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
  },
  w_full: {
    width: '100%'
  },
  font_medium: {
    fontWeight: '500'
  }
})

export default function ProfileScreen() {
  const [selectedPhoto, setSelectedPhoto] = useState<Post>({} as Post)
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
  const tabLineOffsetX = React.useMemo(() => new Animated.Value(0), [])

  const popupImageTop = new Animated.Value(0)
  const popupImageLeft = new Animated.Value(0)
  const popupImageWidth = new Animated.Value(0)
  const popupImageHeight = new Animated.Value(0)

  const user = useSelector(state => state.user).user as User

  const [photos, setPhotos] = useState<Post[]>([])

  useEffect(() => {
    async function fetchMyAPI() {
      const queryString = query(collection(firestore, 'posts'), where('authorId', '==', user.id))
      const querySnapshot = await getDocs(queryString)

      const tempPostList: Post[] = []

      querySnapshot.forEach(responseData => {
        tempPostList.push(responseData.data() as Post)
      })

      setPhotos(tempPostList)
    }
    fetchMyAPI()
  }, [user.id])

  const showPopupImage = (e: { pX: number; pY: number; w: number; h: number }, photo: Post) => {
    ref.current.prePopupImage = e
    setSelectedPhoto(photo)
  }
  const hidePopupImage = () => {
    Animated.timing(popupImageTop, {
      toValue: ref.current.prePopupImage.pY - 44 - 40,
      duration: 150,
      useNativeDriver: false
    }).start()
    Animated.timing(popupImageLeft, {
      toValue: ref.current.prePopupImage.pX,
      duration: 150,
      useNativeDriver: false
    }).start()
    Animated.timing(popupImageWidth, {
      toValue: ref.current.prePopupImage.w,
      duration: 150,
      useNativeDriver: false
    }).start()
    Animated.timing(popupImageHeight, {
      toValue: ref.current.prePopupImage.h,
      duration: 150,
      useNativeDriver: false
    }).start(() => setSelectedPhoto({} as Post))
  }

  const popupImageLocation = {
    popupImageTop,
    popupImageLeft,
    popupImageWidth,
    popupImageHeight
  }

  const scrollHRef = useRef<ScrollView>(null)
  const scrollVRef = useRef<ScrollView>(null)
  const scrollTabRef = useRef<ScrollView>(null)

  const onScrollEndDragContainerScroll = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
      ref.current.currentTab = 2
      scrollHRef.current?.scrollTo({
        x: SCREEN_WIDTH / 2,
        y: 0,
        animated: true
      })
    } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
      ref.current.currentTab = 1
      scrollHRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    } else if (x < SCREEN_WIDTH / 4 && ref.current.currentTab === 1) {
      scrollHRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    } else if (x > SCREEN_WIDTH / 4 && ref.current.currentTab === 2) {
      scrollHRef.current?.scrollTo({
        x: SCREEN_WIDTH / 2,
        y: 0,
        animated: true
      })
    }
  }
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

  const onToggleGalleryTab = (tab: number) => {
    onBackToMainScreen()
    if (ref.current.currentGalleryTab === 1 && tab === 2) {
      ref.current.currentGalleryTab = 2
      Animated.timing(tabLineOffsetX, {
        toValue: SCREEN_WIDTH / 2,
        duration: 200,
        useNativeDriver: false
      }).start()
      scrollTabRef.current?.scrollTo({
        x: SCREEN_WIDTH,
        y: 0,
        animated: true
      })
    } else if (ref.current.currentGalleryTab === 2 && tab === 1) {
      ref.current.currentGalleryTab = 1
      Animated.timing(tabLineOffsetX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start()
      scrollTabRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
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

  const onSetHeaderHeight = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    ref.current.headerHeight = height
  }

  const onScrollEndDragGalleryTabScroll = ({
    nativeEvent: {
      contentOffset: { x }
    }
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    onBackToMainScreen()
    if (x > SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 1) {
      ref.current.currentGalleryTab = 2
      scrollTabRef.current?.scrollTo({
        x: SCREEN_WIDTH,
        y: 0,
        animated: true
      })
      Animated.timing(tabLineOffsetX, {
        toValue: SCREEN_WIDTH / 2,
        duration: 200,
        useNativeDriver: false
      }).start()
    } else if (x < SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 2) {
      ref.current.currentGalleryTab = 1
      scrollTabRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
      Animated.timing(tabLineOffsetX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start()
    } else if (x < SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 1) {
      scrollTabRef.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
      Animated.timing(tabLineOffsetX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start()
    } else if (x > SCREEN_WIDTH / 2 && ref.current.currentGalleryTab === 2) {
      scrollTabRef.current?.scrollTo({
        x: SCREEN_WIDTH,
        y: 0,
        animated: true
      })
      Animated.timing(tabLineOffsetX, {
        toValue: SCREEN_WIDTH / 2,
        duration: 200,
        useNativeDriver: false
      }).start()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PopupImage
        selectedPhoto={selectedPhoto}
        refProps={ref}
        popupImageLocation={popupImageLocation}
      />
      <ScrollView
        onScrollEndDrag={onScrollEndDragContainerScroll}
        ref={scrollHRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.profileContainer}>
          <ScrollView
            ref={scrollVRef}
            onScroll={onVerticalScrollViewScroll}
            scrollEventThrottle={20}
            style={styles.w_full}
          >
            <TouchableOpacity activeOpacity={1} onPress={onBackToMainScreen}>
              <View onLayout={onSetHeaderHeight}>
                <ProfileExtraInfo curRef={ref} scrollVRef={scrollVRef} />
                <ProfileInfo />
                <TouchableOpacity
                  // onPress={() => navigate('EditProfile')}
                  activeOpacity={0.6}
                  style={styles.btnEditProfile}
                >
                  <Text style={styles.font_medium}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              <ProfileGallery
                tabLineOffsetX={tabLineOffsetX}
                scrollTabRef={scrollTabRef}
                onToggleGalleryTab={onToggleGalleryTab}
                onScrollEndDragGalleryTabScroll={onScrollEndDragGalleryTabScroll}
                hidePopupImage={hidePopupImage}
                showPopupImage={showPopupImage}
                photos={photos}
              />
              <ProfileRecommend />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
