/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Input } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { SendFillIcon } from '../icons'
import styles from './styles'

export const CommentInput = ({ reply }) => {
  const [message, setMessage] = useState('')
  const height = useSharedValue(60)
  const widthInput = useSharedValue(Dimensions.get('screen').width - 100)
  const sendButtonOpacity = useSharedValue(1)

  useEffect(() => {
    if (reply) {
      height.value = withTiming(130)
    } else {
      height.value = withSpring(60)
    }
  }, [reply])

  useEffect(() => {
    if (message) {
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
          <Avatar
            style={styles.imageContainer}
            shape="square"
            source={{ uri: 'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg' }}
          />
        </TouchableOpacity>
        <Animated.View style={[styles.input, widthInputAnimatedStyle]}>
          <Input
            multiline
            placeholder={'Add a comment...'}
            value={message}
            onChangeText={text => setMessage(text)}
            size="medium"
          />
        </Animated.View>
        <Animated.View style={[opacitySendButtonStyle]}>
          <TouchableOpacity style={styles.sendButton}>
            <SendFillIcon fill="#5243AA" />
          </TouchableOpacity>
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
