import { getState, useSelector } from '@src/common'
import { USERIDS_DIVIDER } from '@src/constants'
import { chatService } from '@src/services/chat-service'
import { Text, TabView, Tab, List } from '@ui-kitten/components'
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

  const renderItem = ({ item }: any) => <Conversation conversation={item} />

  const getDirectMessageList = () => {
    const list = []
    for (const conversation of conversations) {
      if (
        conversation.userIds.split(USERIDS_DIVIDER).length === 2 &&
        conversation.messages.length !== 0
      ) {
        list.push(conversation)
      }
    }

    const sortedList = list.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].createdAt - a.messages[a.messages.length - 1].createdAt
    )
    return sortedList
  }

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
        <List data={getDirectMessageList()} renderItem={renderItem} />
      </Tab>
      <Tab title={<TabTitle text="Group Chat" />}>
        <></>
        {/* <List
          data={conversations.filter(conver => conver.messages.length !== 0)}
          renderItem={renderItem}
        /> */}
      </Tab>
    </TabView>
  )
}

export default TabViewSection
