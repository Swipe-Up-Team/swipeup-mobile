import { DismissKeyboardView } from '@src/components'
import { Button, Icon, IconElement, Input } from '@ui-kitten/components'
import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ImageStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ReceivedMessage from '../message/received-message'
import SentMessage from '../message/sent-message'
import TypingMessage from '../message/typing-message'
import styles from './styles'

// const keyboardOffset = (height: number): number => Platform.select({
//   android: 0,
//   ios: height,
// });

export const ContentView = () => {
  const [inputText, setInputText] = useState('')

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <SentMessage />
          <SentMessage />
          <SentMessage />
          {/* <TypingMessage /> */}
        </View>
        <View
          style={styles.messageInputContainer}
          // offset={keyboardOffset}
        >
          <Button
            style={[styles.iconButton, styles.attachButton]}
            accessoryLeft={PlusIcon}
            // onPress={toggleAttachmentsMenu}
          />
          <Input
            style={styles.messageInput}
            placeholder="Message..."
            // value={message}
            // onChangeText={setMessage}
            accessoryRight={MicIcon}
          />
          <Button
            appearance="ghost"
            style={[styles.iconButton, styles.sendButton]}
            accessoryLeft={PaperPlaneIcon}
            // disabled={!sendButtonEnabled()}
            // onPress={onSendButtonPress}
          />
        </View>
      </View>
    </DismissKeyboardView>
  )
}

export const PlusIcon = (style: any): IconElement => <Icon {...style} name="plus" />

export const MicIcon = (style: any): IconElement => <Icon {...style} name="mic" />

export const PaperPlaneIcon = (style: any): IconElement => <Icon {...style} name="paper-plane" />

export default ContentView
