import { BackIcon, MicIcon, PaperPlaneIcon, PlusIcon } from '@src/components'
import { Button, Input, List, ListItem } from '@ui-kitten/components'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { ChatBotAvatar } from './chat-bot-avatar'
import styles from './styles'

export const ChatBotRoomScreen = () => {
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = () => {}

  return (
    <>
      <View style={styles.topContainer}>
        <BackIcon />
        <ListItem
          disabled
          style={{ width: '95%' }}
          title={'MR.BOT'}
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
            data={[]}
            renderItem={() => <></>}
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
