import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, ListItem } from '@ui-kitten/components'
import ChatAvatar from '../chat-avatar'
import styles from './styles'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { navigate } from '@src/navigation/navigation-service'

const SenderName = (prop: any) => <Text {...prop}>Sender Name</Text>

const RightSection = () => (
  <View style={styles.rightContainer}>
    <Text style={styles.timeText}>9:15</Text>
    <View style={styles.unSeenContainer}>
      <Text style={styles.unSeenText}>15</Text>
    </View>
  </View>
)

const Conversation = (props: any) => {
  const navigateToChatRoom = () => {
    navigate(APP_SCREEN.CHAT_ROOM)
  }

  return (
    <ListItem
      title="Sender Name"
      description="A set of React Native components"
      accessoryLeft={<ChatAvatar />}
      accessoryRight={<RightSection />}
      style={[props.style, { height: 80 }]}
      onPress={navigateToChatRoom}
    />
  )
}

export default Conversation
