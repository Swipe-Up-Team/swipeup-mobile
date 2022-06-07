import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Avatar, ListItem } from '@ui-kitten/components'
import ChatAvatar from '../chat-avatar'
import styles from './styles'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { navigate } from '@src/navigation/navigation-service'
import { getState } from '@src/common'
import { formatTime, shortenConversationText } from '@src/utils'
import { Message, User } from '@src/models'
import { USERIDS_DIVIDER } from '@src/constants'
import { userService } from '@src/services'

const SenderName = (prop: any) => <Text {...prop}>Sender Name</Text>

const RightSection = ({ time, ...props }: any) => (
  <View style={styles.rightContainer}>
    <Text style={styles.timeText}>{formatTime(time)}</Text>
    <View style={styles.unSeenContainer}>
      <Text style={styles.unSeenText}>15</Text>
    </View>
  </View>
)

const defaultMessage: Message = {
  id: '',
  senderId: '',
  message: '',
  createdAt: 0
}

const defaultUser: User = {
  id: '',
  email: '',
  name: '',
  status: 1,
  avatar: '',
  bio: '',
  birthDay: {
    date: 0,
    month: 0,
    year: 0
  },
  gender: 0,
  phone: '',
  followingIDs: [],
  createdAt: 0,
  updatedAt: 0
}

const Conversation = ({ conversation, ...props }: any) => {
  const userId = getState('user').user?.id

  const [friend, setFriend] = useState<User>(defaultUser)
  const [lastedMessage, setLastedMessage] = useState<Message>(defaultMessage)

  const navigateToChatRoom = () => {
    navigate(APP_SCREEN.CHAT_ROOM, {
      conversationId: conversation.id
    })
  }

  const getLastedMessage = () => {
    const messages = conversation.messages
    const lastMessage = messages[messages.length - 1]
    setLastedMessage(lastMessage)
  }

  useEffect(() => {
    const getConversationInfo = async () => {
      const members = conversation.userIds.split(USERIDS_DIVIDER)
      const friendId = members.find((id: string) => id !== userId)

      const friend = await userService.getUser(friendId)
      if (friend) {
        setFriend(friend)
      }
    }

    getConversationInfo()
    getLastedMessage()
  }, [])

  return (
    <ListItem
      title={shortenConversationText(friend?.name!)}
      description={
        lastedMessage.senderId === userId
          ? shortenConversationText('You: ' + lastedMessage!.message)
          : shortenConversationText(lastedMessage!.message)
      }
      accessoryLeft={<ChatAvatar />}
      accessoryRight={<RightSection time={lastedMessage!.createdAt} />}
      style={[props.style, { height: 80 }]}
      onPress={navigateToChatRoom}
    />
  )
}

export default Conversation
