import { ChatSearchIcon } from '@components/icons'
import { DismissKeyboardView } from '@src/components/HOCs'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { Avatar, Input, Layout } from '@ui-kitten/components'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ChatBotAvatar } from '../chat-room/components/chat-bot/chat-bot-avatar'
import TabViewSection from './components/tabs-section'
import styles from './styles'

export const ChatScreen = () => {
  const [searchText, setSearchText] = useState('')

  const navigateToChatBotRoom = () => {
    navigate(APP_SCREEN.CHATBOT_ROOM)
  }

  return (
    <DismissKeyboardView>
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer}>
          <Input
            style={styles.input}
            placeholder="Find your friends"
            accessoryLeft={<ChatSearchIcon />}
            value={searchText}
            onChangeText={nextValue => setSearchText(nextValue)}
          />
          <TouchableOpacity onPress={navigateToChatBotRoom}>
            <ChatBotAvatar size="small" />
          </TouchableOpacity>
        </Layout>
        <View style={styles.friendOnlineContainer} />
        <View style={styles.mainChatContainer}>
          <TabViewSection />
        </View>
      </Layout>
    </DismissKeyboardView>
  )
}

export default ChatScreen
