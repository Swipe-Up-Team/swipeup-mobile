import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, ListItem } from '@ui-kitten/components'
import ChatAvatar from '../chat-avatar'
import styles from './styles'

const SenderName = (prop: any) => (
  <Text {...prop} >
    Sender Name
  </Text>
)

const RightSection = () => (
  <View style={styles.rightContainer}>
    <Text style={styles.timeText}>9:15</Text>
    <View style={styles.unSeenContainer}>
      <Text style={styles.unSeenText}>15</Text>
    </View>
  </View>
)

const Conversation = (props: any) => (
  <ListItem
    title='Sender Name'
    description="A set of React Native components"
    accessoryLeft={<ChatAvatar />}
    accessoryRight={<RightSection />}
    style={[props.style, { height: 80 }]}
  />
)

export default Conversation
