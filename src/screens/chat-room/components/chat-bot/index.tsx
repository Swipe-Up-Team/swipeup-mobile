import { getState, useSelector } from '@src/common'
import { BackIcon, MicIcon, PaperPlaneIcon, PlusIcon } from '@src/components'
import { BOT, BOT_NAME, initialChatbotMessages } from '@src/constants'
import { CONVERSATION_TYPE, Message } from '@src/models'
import { Button, Input, List, ListItem } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import ReceivedMessage from '../message/received-message'
import SentMessage from '../message/sent-message'
import { ChatBotAvatar } from './chat-bot-avatar'
// import { Dialogflow_V2 } from 'react-native-dialogflow'
import styles from './styles'
import { dialogflowConfig } from '@src/config/dialogflow-config'
import { chatService } from '@src/services/chat-service'

export const ChatBotRoomScreen = () => {
  const userId = getState('user').user?.id

  const chatbotConversation = useSelector(x => x.chat.chatbotConversation)

  const [inputMessage, setInputMessage] = useState('')
  const [messageList, setMessageList] = useState<Message[]>(
    chatbotConversation || initialChatbotMessages
  )

  const sendMessage = async () => {
    if (inputMessage.trim().length === 0) {
      setInputMessage('')
      return
    }

    await chatService.chabotHandleSendMessage(inputMessage)
  }

  const renderItem = ({ item, index }: any) => {
    // Sent Message
    if (item.senderId === userId) {
      if (
        index === 0 ||
        new Date(messageList[index].createdAt).getDay() !==
          new Date(messageList[index - 1].createdAt).getDay()
      ) {
        if (
          index !== messageList.length - 1 &&
          messageList[index].senderId === messageList[index + 1].senderId
        ) {
          return <SentMessage message={item} displayDate />
        }
        return <SentMessage message={item} displayDate displayTime />
      } else if (index === messageList.length - 1) {
        return <SentMessage message={item} displayTime />
      } else {
        return <SentMessage message={item} />
      }
    }
    // Received Message
    else {
      if (
        index === 0 ||
        new Date(messageList[index].createdAt).getDay() !==
          new Date(messageList[index - 1].createdAt).getDay()
      ) {
        return (
          <ReceivedMessage
            message={item}
            friend={BOT}
            date={messageList[index].createdAt}
            displayTime
            displayAvatar
            conversationType={CONVERSATION_TYPE.GROUP}
          />
        )
      } else if (messageList[index].senderId !== messageList[index - 1].senderId) {
        return (
          <ReceivedMessage
            message={item}
            friend={BOT}
            displayTime
            displayAvatar
            conversationType={CONVERSATION_TYPE.GROUP}
          />
        )
      } else {
        return (
          <ReceivedMessage message={item} friend={BOT} conversationType={CONVERSATION_TYPE.GROUP} />
        )
      }
    }
  }

  useEffect(() => {
    // Dialogflow_V2.setConfiguration(
    //   dialogflowConfig.client_email,
    //   dialogflowConfig.private_key,
    //   Dialogflow_V2.LANG_ENGLISH_US,
    //   dialogflowConfig.project_id
    // )
  }, [])

  return (
    <>
      <View style={styles.topContainer}>
        <BackIcon />
        <ListItem
          disabled
          style={{ width: '95%' }}
          title={BOT_NAME}
          description={'Quickly reply to you'}
          accessoryLeft={<ChatBotAvatar size="large" />}
          // accessoryRight={<RightSection />}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <List
            style={styles.messageContainer}
            contentContainerStyle={styles.messageContentContainer}
            showsVerticalScrollIndicator={false}
            // ref={listRef}
            data={messageList}
            renderItem={renderItem}
            ListHeaderComponent={<View style={{ height: 200 }} />}
            // onLayout={() => listRef.current?.scrollToEnd()}
            // onContentSizeChange={() => listRef.current?.scrollToEnd()}
          />
          <View>
            <View style={styles.messageInputContainer}>
              <Button style={[styles.iconButton, styles.attachButton]} accessoryLeft={PlusIcon} />
              <Input
                style={styles.messageInput}
                placeholder="Message..."
                value={inputMessage}
                accessoryRight={MicIcon}
                onChangeText={setInputMessage}
              />
              <Button
                appearance="ghost"
                style={[styles.iconButton, styles.sendButton]}
                accessoryLeft={PaperPlaneIcon}
                onPress={sendMessage}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
