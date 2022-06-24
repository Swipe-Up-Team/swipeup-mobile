import { CameraFillIcon } from '@src/components'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { User } from '@src/models'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import ExpoFastImage from 'expo-fast-image'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './styles'
interface Props {
  viewedUser: User
}

export default function ProfileHeader({ viewedUser }: Props) {
  const handleChangeAvatarPress = () => {
    navigate(APP_SCREEN.GALLERY_CHOOSER, {
      mediaType: 'photo',
      isMultiple: false,
      prevScreen: APP_SCREEN.PROFILE
    })
  }
  return (
    <View>
      <View style={styles.infoWrapper}>
        <TouchableOpacity style={styles.avatarWrapper} onPress={handleChangeAvatarPress}>
          <ExpoFastImage
            style={styles.mainAvatar}
            source={{
              uri: viewedUser?.avatar || DEFAULT_PHOTO_URI,
              cache: 'force-cache'
            }}
          />
          <TouchableOpacity style={styles.changeAvatarBtn} onPress={handleChangeAvatarPress}>
            <CameraFillIcon />
          </TouchableOpacity>
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
