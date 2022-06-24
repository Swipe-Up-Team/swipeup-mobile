/* eslint-disable react-hooks/exhaustive-deps */
import { RouteProp, useRoute } from '@react-navigation/native'
import { dispatch, getState, useKeyboardHeight, useSelector } from '@src/common'
import { BottomSheet, PostCard } from '@src/components'
import { Post, PostPayload } from '@src/models'
import { goBack } from '@src/navigation/navigation-service'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import { postService } from '@src/services'
import { onEndProcess, onStartProcess } from '@src/store/reducers/app-reducer'
import { Button, Spinner } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import styles from './styles'

export const SharePostScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.SHARE_POST>>()
  const { user } = getState('user')
  const { post } = route.params
  const [textPost, setTextPost] = useState('')
  const [loading, setLoading] = useState(true)
  const [sharedPost, setSharedPost] = useState<Post>()
  const keyboardHeight = useKeyboardHeight()
  const marginBottomContainer = useSharedValue(0)

  useEffect(() => {
    ;(async () => {
      if (!loading) setLoading(true)

      const result = await postService.getFirstSharedPost(post)
      if (result) setSharedPost(result)

      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    marginBottomContainer.value = withSpring(keyboardHeight)
  }, [keyboardHeight])

  const handleSubmitSharePostPress = async () => {
    if (!user || !post) return

    dispatch(onStartProcess())
    try {
      const newPost: Partial<PostPayload> = {
        content: {
          video: null,
          text: textPost.trim(),
          sharedPostId: post?.id
        },
        authorId: user?.id
      }
      await postService.createNew(user, newPost)
      goBack()
      dispatch(onEndProcess())
      Toast.show({
        type: 'success',
        text1: 'Share post successfully.'
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something has error, please try again later.'
      })
      dispatch(onEndProcess())
    }
  }

  const marginBottomContainerStyle = useAnimatedStyle(() => ({
    marginBottom: marginBottomContainer.value
  }))

  return (
    <BottomSheet useKeyboard title="Share Post">
      {loading || !sharedPost ? (
        <View style={styles.loadingContainer}>
          <Spinner />
        </View>
      ) : (
        <Animated.View style={[styles.rootContainer, marginBottomContainerStyle]}>
          <View style={styles.editorContainer}>
            <TextInput
              multiline
              placeholder="Say something about this..."
              placeholderTextColor="#96A0B0"
              style={styles.editor}
              value={textPost}
              onChangeText={setTextPost}
            />
          </View>
          <View style={[styles.sharedPostContainer]}>
            <PostCard post={sharedPost} shared />
          </View>
          <View style={styles.btnContainer}>
            <Button onPress={handleSubmitSharePostPress}>Share Now</Button>
          </View>
        </Animated.View>
      )}
    </BottomSheet>
  )
}
