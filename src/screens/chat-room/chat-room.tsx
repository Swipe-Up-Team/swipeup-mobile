import { AttachmentsMenu } from './components'
import { RouteProp, useRoute } from '@react-navigation/native'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles'
import { BackIcon, ChatActionIcon, MicIcon, PaperPlaneIcon, PlusIcon, XIcon } from '@src/components'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Input, List, ListItem, Button } from '@ui-kitten/components'
import { shortenConversationText } from '@src/utils'
import ChatAvatar from '../chat/components/chat-avatar'
import { ChoseAsset } from '../add-post/components'
import { getState, useArray, useSelector } from '@src/common'
import { Message, MESSAGE_TYPE, User } from '@src/models'
import * as MediaLibrary from 'expo-media-library'
import SentMessage from './components/message/sent-message'
import ReceivedMessage from './components/message/received-message'
import { chatService } from '@src/services/chat-service'
import { navigate } from '@src/navigation/navigation-service'
import { USERIDS_DIVIDER } from '@src/constants'
import TypingMessage from './components/message/typing-message'

const RightSection = () => (
  <View style={styles.topRightContainer}>
    <ChatActionIcon name="phone-call-outline" />
    <ChatActionIcon name="video-outline" />
  </View>
)

export const ChatRoomScreen = (props: any) => {
  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.CHAT_ROOM>>()

  const userId = getState('user').user?.id
  const { systemAssets } = getState('systemAssets')

  const listRef = useRef<List>(null)

  const [conversationId, setConversationId] = useState(route.params?.conversationId)
  const [friend, setFriend] = useState<User>(route.params?.friend)
  const [inputMessage, setInputMessage] = useState('')
  const [messageList, setMessageList] = useState<Message[]>([])
  const [typingList, setTypingList] = useState<string[]>([])
  const [attachmentsMenuVisible, setAttachmentsMenuVisible] = useState<boolean>(false)

  const conversation = useSelector(x => x.chat.conversations.find(x => x.id === conversationId))
  const typingIds = useSelector(
    x => x.chat.conversations.find(x => x.id === conversationId)?.typingIds
  )

  const [selectedAssets, selectedAssetsActions] = useArray<MediaLibrary.Asset>([])

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
            friend={friend}
            date={messageList[index].createdAt}
            displayTime
            displayAvatar
          />
        )
      } else if (messageList[index].senderId !== messageList[index - 1].senderId) {
        return <ReceivedMessage message={item} friend={friend} displayTime displayAvatar />
      } else {
        return <ReceivedMessage message={item} friend={friend} />
      }
    }
  }

  const sendTextMessage = async () => {
    if (inputMessage.trim().length === 0) {
      setInputMessage('')
      return
    }

    const message: Message = {
      senderId: userId!,
      type: MESSAGE_TYPE.MESSAGE,
      message: inputMessage.trim(),
      image: '',
      createdAt: new Date().getTime()
    }

    if (conversation) {
      await chatService.sendTextMessage(message, conversationId)
    }

    setInputMessage('')
  }

  const sendImageMessage = async () => {
    await chatService.sendImageMessage(selectedAssets, userId!, conversationId)
    selectedAssetsActions.clear()
  }

  const sendMessage = async () => {
    // send
    if (selectedAssets.length > 0) {
      sendImageMessage()
    } else {
      sendTextMessage()
    }
  }

  const sendTypingAction = async () => {
    await chatService.sendTypingAction(userId!, conversationId)
  }

  const removeTypingAction = async () => {
    await chatService.removeTypingAction(userId!, conversationId)
  }

  const toggleAttachmentsMenu = (): void => {
    setAttachmentsMenuVisible(!attachmentsMenuVisible)
  }

  const handleSelectPhoto = async () => {
    navigate(APP_SCREEN.GALLERY_CHOOSER, { selectedAssets, prevScreen: APP_SCREEN.CHAT_ROOM })
  }

  const handleRemoveAsset = (idx: number) => {
    selectedAssetsActions.removeIndex(idx)
  }

  const renderAttachmentsMenu = (): React.ReactElement => (
    <AttachmentsMenu
      onSelectPhoto={handleSelectPhoto}
      onSelectFile={toggleAttachmentsMenu}
      onSelectLocation={toggleAttachmentsMenu}
      onSelectContact={toggleAttachmentsMenu}
      onAttachmentSelect={toggleAttachmentsMenu}
      onCameraPress={toggleAttachmentsMenu}
      onDismiss={toggleAttachmentsMenu}
    />
  )

  useEffect(() => {
    if (conversation) setMessageList(conversation?.messages)
    setTypingList(typingIds ? typingIds.split(USERIDS_DIVIDER) : [])
  }, [conversation])

  useEffect(() => {
    if (route.params?.selectedAssetIndexes && route.params?.selectedAssetIndexes.length > 0) {
      const _selectedAssets: MediaLibrary.Asset[] = []
      route.params?.selectedAssetIndexes.forEach(idx => _selectedAssets.push(systemAssets[idx]))
      selectedAssetsActions.setValue(_selectedAssets)
      toggleAttachmentsMenu()
    }
  }, [route.params?.selectedAssetIndexes])

  return (
    <>
      <View style={styles.topContainer}>
        <BackIcon />
        <ListItem
          {...props}
          disabled
          style={{ width: '95%' }}
          title={shortenConversationText(friend.name)}
          // description="Last seen 10:35"
          accessoryLeft={<ChatAvatar avatar={friend.avatar} />}
          accessoryRight={<RightSection />}
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
            ref={listRef}
            data={messageList}
            renderItem={renderItem}
            ListHeaderComponent={<View style={{ height: 200 }} />}
            ListFooterComponent={
              <View>
                {typingList.map(typingId => {
                  if (typingId && typingId !== userId) {
                    return <TypingMessage />
                  }
                  return null
                })}
              </View>
            }
            onLayout={() => listRef.current?.scrollToEnd()}
            onContentSizeChange={() => listRef.current?.scrollToEnd()}
          />
          <View>
            {selectedAssets.length > 0 && (
              <List
                horizontal
                data={selectedAssets}
                style={styles.selectedAssetsWrapper}
                contentContainerStyle={styles.selectedAssetsContentWrapper}
                renderItem={({ item, index }) => (
                  <ChoseAsset item={item} onRemove={() => handleRemoveAsset(index)} />
                )}
              />
            )}
            <View style={styles.messageInputContainer}>
              <Button
                style={[styles.iconButton, styles.attachButton]}
                accessoryLeft={attachmentsMenuVisible ? XIcon : PlusIcon}
                onPress={toggleAttachmentsMenu}
              />
              <Input
                style={styles.messageInput}
                placeholder="Message..."
                value={inputMessage}
                accessoryRight={MicIcon}
                onChangeText={setInputMessage}
                onFocus={sendTypingAction}
                onBlur={removeTypingAction}
                disabled={selectedAssets.length > 0}
              />
              <Button
                appearance="ghost"
                style={[styles.iconButton, styles.sendButton]}
                accessoryLeft={PaperPlaneIcon}
                onPress={sendMessage}
              />
            </View>
          </View>
          {attachmentsMenuVisible && renderAttachmentsMenu()}
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
