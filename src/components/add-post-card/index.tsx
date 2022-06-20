import { Text } from '@ui-kitten/components'
import React, { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'

import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { PostPhotoIcon, PostTagFriendIcon, PostVideoIcon } from '../icons'
import styles from './styles'
import { UserAvatarSquare } from '../user-avatar-square'
import { getState } from '@src/common'
import isEqual from 'react-fast-compare'

const AddPostCardComponent = () => {
  const navigation = useNavigation()
  const { user } = getState('user')

  const handlePhotoUploadPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: APP_SCREEN.AUTHORIZE },
          { name: APP_SCREEN.ADD_POST },
          { name: APP_SCREEN.GALLERY_CHOOSER }
        ]
      })
    )
  }

  const handleAddPostPress = () => {
    navigate(APP_SCREEN.ADD_POST, {})
  }

  return (
    <View style={styles.container}>
      <View style={styles.postToolWrapper}>
        <TouchableOpacity activeOpacity={0.5} style={styles.userAvatarWrapper}>
          <UserAvatarSquare uri={user?.avatar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPostPress} style={styles.postInputWrapper}>
          <View style={styles.postInput}>
            {/* TODO: change to user's name */}
            <Text appearance="hint" style={styles.postInputPlaceholder}>
              What's on your mind?
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity
          onPress={handlePhotoUploadPress}
          activeOpacity={0.5}
          style={styles.postOptionItemWrapper}
        >
          <PostPhotoIcon />
          <Text style={styles.postOptionItemText}>Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePhotoUploadPress}
          activeOpacity={0.5}
          style={styles.postOptionItemWrapper}
        >
          <PostVideoIcon />
          <Text style={styles.postOptionItemText}>Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAddPostPress}
          activeOpacity={0.5}
          style={[styles.postOptionItemWrapper, styles.lastPostOptionItemWrapper]}
        >
          <PostTagFriendIcon />
          <Text style={styles.postOptionItemText}>Tag a friend</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const AddPostCard = memo(AddPostCardComponent, isEqual)
