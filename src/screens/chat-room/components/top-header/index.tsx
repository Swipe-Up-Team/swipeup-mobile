import { BackIcon, ChatActionIcon } from '@src/components/icons'
import ChatAvatar from '@src/screens/chat/components/chat-avatar'
import { shortenConversationText } from '@src/utils'
import { ListItem } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import styles from './styles'

const RightSection = () => (
  <View style={styles.rightContainer}>
    <ChatActionIcon name="phone-call-outline" />
    <ChatActionIcon name="video-outline" />
  </View>
)

const TopHeader = ({ friendName, ...props }: any) => {
  return (
    <View style={styles.container}>
      <BackIcon />
      <ListItem
        {...props}
        disabled
        style={{ width: '95%' }}
        title={shortenConversationText(friendName)}
        description="Last seen 10:35"
        accessoryLeft={<ChatAvatar />}
        accessoryRight={<RightSection />}
      />
    </View>
  )
}

export default TopHeader
