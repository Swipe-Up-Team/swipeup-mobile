import { getState, useSelector } from '@src/common'
import { chatService } from '@src/services/chat-service'
import { Text, Layout, TabView, Tab, List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import Conversation from '../conversation'
import styles from './styles'

const TabTitle = ({ text, ...props }: any) => (
  <Text {...props} style={[props!.style, { marginTop: 10 }]}>
    {text}
  </Text>
)

const TabViewSection = () => {
  const userId = getState('user').user?.id
  const { conversations } = useSelector(x => x.chat)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const renderItem = ({ item, index }: any) => <Conversation conversation={item} />

  useEffect(() => {
    chatService.getConversations(userId!)
  }, [])

  return (
    <TabView
      indicatorStyle={styles.indicator}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <Tab title={<TabTitle text="Direct Message" />}>
        <List data={conversations} renderItem={renderItem} />
      </Tab>
      <Tab title={<TabTitle text="Group Chat" />}>
        <List data={conversations} renderItem={renderItem} />
      </Tab>
    </TabView>
  )
}

export default TabViewSection
