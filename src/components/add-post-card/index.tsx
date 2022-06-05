import { Avatar, Text } from '@ui-kitten/components'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { PostPhotoIcon, PostTagFriendIcon, PostVideoIcon } from '../icons'
import styles from './styles'
import { CommonActions, useNavigation } from '@react-navigation/native'

export function AddPostCard() {
  const navigation = useNavigation()

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
          <Avatar
            shape="square"
            source={{ uri: 'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg' }}
            style={styles.userAvatar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPostPress} style={styles.postInputWrapper}>
          <View style={styles.postInput}>
            {/* TODO: change to user's name */}
            <Text appearance="hint" style={styles.postInputPlaceholder}>
              What's on your mind, Khoa?
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
