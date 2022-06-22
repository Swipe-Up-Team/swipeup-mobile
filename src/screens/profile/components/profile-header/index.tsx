import { NavigationBar } from '@src/components'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { User } from '@src/models'
import ExpoFastImage from 'expo-fast-image'
import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './styles'

interface Props {
  user: User
}

export default function ProfileHeader({ user }: Props) {
  return (
    <View>
      <NavigationBar title={user.name} showLeftIcon={false} />

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
