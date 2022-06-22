/* eslint-disable react-hooks/exhaustive-deps */
import { getState } from '@src/common'
import { Spinner } from '@ui-kitten/components'
import React, { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { TextInput, Dimensions, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { SendFillIcon } from '../icons'
import { UserAvatarSquare } from '../user-avatar-square'
import styles from './styles'

interface CommentInputComponentProps {
  reply?: boolean
  onSubmit: (text: string) => void
}
const CommentInputComponent = ({ reply, onSubmit }: CommentInputComponentProps) => {
  const { user } = getState('user')

  const [addingComment, setAddingComment] = useState(false)
  const [message, setMessage] = useState('')
  const height = useSharedValue(60)
  const widthInput = useSharedValue(Dimensions.get('screen').width - 100)
  const sendButtonOpacity = useSharedValue(1)

  const handleAddComment = async () => {
    if (onSubmit) {
      setAddingComment(true)

      try {
        await onSubmit(message.trim())
        setMessage('')
      } catch (error) {
        console.log(error)
      }

      setAddingComment(false)
    }
  }
  // Animated funcs
  useEffect(() => {
    if (reply) {
      height.value = withTiming(130)
    } else {
      height.value = withSpring(50)
    }
  }, [reply])

  useEffect(() => {
    if (message.trim()) {
      widthInput.value = withTiming(Dimensions.get('screen').width - 100)
      sendButtonOpacity.value = withTiming(1)
    } else {
      widthInput.value = withSpring(Dimensions.get('screen').width - 70)
      sendButtonOpacity.value = withSpring(0)
    }
  }, [message])

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value
    }
  })

  const widthInputAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: widthInput.value
    }
  })

  const opacitySendButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: sendButtonOpacity.value
    }
  })

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => {}}>
          <UserAvatarSquare uri={user?.avatar} />
        </TouchableOpacity>
        <Animated.View style={[styles.input, widthInputAnimatedStyle]}>
          <TextInput
            multiline
            placeholder={'Add a comment...'}
            value={message}
            onChangeText={text => setMessage(text)}
            style={styles.textInput}
          />
        </Animated.View>
        <Animated.View style={[opacitySendButtonStyle]}>
          {addingComment ? (
            <Spinner />
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <SendFillIcon fill="#5243AA" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Animated.View>
  )
}

// {reply ? (
//   <View style={styles.replyContainer}>
//     <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
//       {/* <Icon name="close" color="#000" size={20} /> */}X
//     </TouchableOpacity>
//     <Text style={styles.title}>Response to {isLeft ? username : 'Me'}</Text>
//     <Text style={styles.reply}>{reply}</Text>
//   </View>
// ) : null}
export const CommentInput = memo(CommentInputComponent, isEqual)
