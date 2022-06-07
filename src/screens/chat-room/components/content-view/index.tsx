import { getState, useSelector } from '@src/common'
import { DismissKeyboardView } from '@src/components'
import { Message } from '@src/models'
import { chatService } from '@src/services/chat-service'
import { Button, Icon, IconElement, Input, List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ImageStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ReceivedMessage from '../message/received-message'
import SentMessage from '../message/sent-message'
import TypingMessage from '../message/typing-message'
import styles from './styles'

export const ContentView = ({ conversationId }: any) => {
  const userId = getState('user').user?.id
  const conversation = useSelector(x => x.chat.conversations.find(x => x.id === conversationId))

  const [messageList, setMessageList] = useState<Message[]>([])
  const [inputMessage, setinputMessage] = useState('')

  const renderItem = ({ item, index }: any) => {
    if (item.senderId === userId) {
      return <SentMessage message={item} />
    } else {
      return <ReceivedMessage message={item} />
    }
  }

  const sendMessage = async () => {
    if (inputMessage.length === 0) return

    const message: Message = {
      senderId: userId!,
      message: inputMessage.trim(),
      createdAt: new Date().getTime()
    }

    await chatService.sendMessage(message, conversationId)
  }

  useEffect(() => {
    setMessageList(conversation?.messages)
  }, [conversation])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <List style={styles.messageContainer} data={messageList} renderItem={renderItem} />
        <View style={styles.messageInputContainer}>
          <Button
            style={[styles.iconButton, styles.attachButton]}
            accessoryLeft={PlusIcon}
            // onPress={toggleAttachmentsMenu}
          />
          <Input
            style={styles.messageInput}
            placeholder="Message..."
            value={inputMessage}
            onChangeText={setinputMessage}
            accessoryRight={MicIcon}
          />
          <Button
            appearance="ghost"
            style={[styles.iconButton, styles.sendButton]}
            accessoryLeft={PaperPlaneIcon}
            onPress={sendMessage}
            // disabled={!sendButtonEnabled()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export const PlusIcon = (style: any): IconElement => <Icon {...style} name="plus" />

export const MicIcon = (style: any): IconElement => <Icon {...style} name="mic" />

export const PaperPlaneIcon = (style: any): IconElement => <Icon {...style} name="paper-plane" />

export default ContentView
