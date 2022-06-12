import { User } from '@src/models'
import { Icon } from '@ui-kitten/components'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DEFAULT_BACKGROUND_URI, DEFAULT_PHOTO_URI } from '@src/constants'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { useSelector } from '@src/common'

// interface Props {
//   curRef: React.MutableRefObject<{
//     currentTab: number
//     currentGalleryTab: number
//     headerHeight: number
//     showHeaderTab: boolean
//     prePopupImage: {
//       pX: number
//       pY: number
//       w: number
//       h: number
//     }
//   }>
//   scrollVRef: React.RefObject<ScrollView>
// }

const styles = StyleSheet.create({
  headerBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarWrapper: {
    // position: 'relative'
  },
  mainAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  plusIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#318bfb',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff'
  },
  btnEditProfile: {
    width: 30,
    height: 30,
    marginTop: 50
  },
  font_medium: {
    fontWeight: '500'
  },
  imageBackground: {
    position: 'absolute',
    height: 300,
    top: 0,
    left: 0,
    right: 0
    // overflow: 'hidden',
    // borderRadius: 30,
  },
  backArrow: {
    margin: 10
  }
})

interface Props {
  user: User
}

export default function ProfileExtraInfo({ user }: Props) {
  return (
    <View>
      {/* <ImageBackground
        blurRadius={6}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 20 }}
        source={{ uri: user.avatar || DEFAULT_BACKGROUND_URI, cache: 'force-cache' }}
      /> */}
      {/* {user.id !== useSelector(state => state.user).user?.id ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigate(APP_SCREEN.FOLLOWING)}
          style={styles.backArrow}
        >
          <Icon name="arrow-back" width={24} height={24} fill="#000" />
        </TouchableOpacity>
      ) : null} */}
      <View style={styles.headerBtnContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => goBack()} style={styles.backArrow}>
          <Icon name="arrow-back" width={24} height={24} fill="#000" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} onPress={() => goBack()} style={styles.backArrow}>
          <Icon name="more-vertical-outline" width={24} height={24} fill="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoWrapper}>
        <TouchableOpacity style={styles.avatarWrapper}>
          <ExpoFastImage
            style={styles.mainAvatar}
            source={{
              uri: user?.avatar || DEFAULT_PHOTO_URI
            }}
          />
          {/* <View style={styles.plusIcon}>
            <Icon width={16} height={16} fill="#fff" name="plus" />
          </View> */}
        </TouchableOpacity>
        {/* {user.id === useSelector(state => state.user).user?.id ? (
          <TouchableOpacity
            onPress={() => navigate(APP_SCREEN.EDIT_PROFILE)}
            activeOpacity={0.6}
            style={styles.btnEditProfile}
          >
            <Icon width={30} height={30} name="edit" fill="#000" />
          </TouchableOpacity>
        ) : null} */}
      </View>
    </View>
  )
}
