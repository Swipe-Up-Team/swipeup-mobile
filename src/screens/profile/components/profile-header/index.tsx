import { User } from '@src/models'
import { Icon } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { goBack } from '@src/navigation/navigation-service'
import styles from './styles'

interface Props {
  user: User
}

export default function ProfileHeader({ user }: Props) {
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

        {/* <TouchableOpacity activeOpacity={0.6} onPress={() => {}} style={styles.backArrow}>
          <Icon name="more-vertical-outline" width={24} height={24} fill="#000" />
        </TouchableOpacity> */}
      </View>
      <View style={styles.infoWrapper}>
        <TouchableOpacity style={styles.avatarWrapper}>
          <ExpoFastImage
            style={styles.mainAvatar}
            source={{
              uri: user?.avatar || DEFAULT_PHOTO_URI,
              cache: 'force-cache'
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
