import {ChatSearchIcon} from '@components/icons'
import { DismissKeyboardView } from '@src/components/HOCs'
import { Icon, Input, Layout, TabView, Tab } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import TabViewSection from './components/tabs-section'
import styles from './styles'

export const ChatScreen = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <DismissKeyboardView>
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          placeholder="Find your friends"
          accessoryLeft={<ChatSearchIcon />}
          value={searchText}
          onChangeText={nextValue => setSearchText(nextValue)}
        />
        <View style={styles.friendOnlineContainer}></View>
        <View style={styles.mainChatContainer}>
          <TabViewSection />
        </View>
      </Layout>
    </DismissKeyboardView>
  )
}

export default ChatScreen
