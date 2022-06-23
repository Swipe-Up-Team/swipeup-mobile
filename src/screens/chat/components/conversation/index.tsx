import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ListItem } from '@ui-kitten/components'
import ChatAvatar from '../chat-avatar'
import styles from './styles'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { navigate } from '@src/navigation/navigation-service'
import { dispatch, getState } from '@src/common'
import { formatTime, shortenConversationText } from '@src/utils'
import { ConversationMembers, CONVERSATION_TYPE, Message, MESSAGE_TYPE, User } from '@src/models'
import { USERIDS_DIVIDER, defaultMessage, DEFAULT_GROUP_URI } from '@src/constants'
import { userService } from '@src/services'
import { getConversationName } from '../../helper'
import { onSetConversationMembers } from '@src/store/reducers/chat-reducer'

// const SenderName = (prop: any) => <Text {...prop}>Sender Name</Text>

const RightSection = ({ time }: any) => (
  <View style={styles.rightContainer}>
    <Text style={styles.timeText}>{formatTime(time)}</Text>
    {/* <View style={styles.unSeenContainer}>
      <Text style={styles.unSeenText}>15</Text>
    </View> */}
  </View>
)

const Conversation = ({ conversation, ...props }: any) => {
  const userId = getState('user').user?.id

  const [listFriend, setListFriend] = useState<User[]>([])
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

  const getDirectConversationDesc = () => {
    if (lastedMessage.senderId === userId) {
      if (lastedMessage.type === MESSAGE_TYPE.MESSAGE) {
        return shortenConversationText('You: ' + lastedMessage!.message)
      } else if (lastedMessage.type === MESSAGE_TYPE.IMAGE) {
        return 'You: [image]'
      }
      return ''
    } else {
      if (lastedMessage.type === MESSAGE_TYPE.MESSAGE) {
        return shortenConversationText(lastedMessage!.message)
      } else if (lastedMessage.type === MESSAGE_TYPE.IMAGE) {
        return '[image]'
      }
      return ''
    }
  }

  const getGroupConversationDesc = () => {
    if (lastedMessage.senderId === userId) {
      if (lastedMessage.type === MESSAGE_TYPE.MESSAGE) {
        return shortenConversationText('You: ' + lastedMessage!.message)
      } else if (lastedMessage.type === MESSAGE_TYPE.IMAGE) {
        return 'You: [image]'
      }
      return ''
    } else {
      const name = listFriend.find(fr => fr.id === lastedMessage.senderId)?.name
      if (lastedMessage.type === MESSAGE_TYPE.MESSAGE) {
        return shortenConversationText(name + ': ' + lastedMessage!.message)
      } else if (lastedMessage.type === MESSAGE_TYPE.IMAGE) {
        return name + ': [image]'
      }
      return ''
    }
  }

  const getConversationDesc = () => {
    if (conversation.type === CONVERSATION_TYPE.DIRECT) {
      return getDirectConversationDesc()
    } else if (conversation.type === CONVERSATION_TYPE.GROUP) {
      return getGroupConversationDesc()
    }
    return ''
  }

  useEffect(() => {
    const getConversationInfo = async () => {
      const list: User[] = []
      const members = conversation.userIds.split(USERIDS_DIVIDER)

      for (const memberId of members) {
        if (memberId === userId) continue

        const member = await userService.getUser(memberId)
        if (member) {
          list.push(member)
        }
      }
      setListFriend(list)

      const conversationMember = {
        conversationId: conversation.id,
        members: list
      }
      dispatch(onSetConversationMembers(conversationMember))
    }

    getConversationInfo()
    getLastedMessage()
  }, [conversation])

  return (
    <ListItem
      title={getConversationName(conversation, listFriend)}
      description={getConversationDesc()}
      accessoryLeft={
        <ChatAvatar
          avatar={
            listFriend.length !== 0 &&
            (conversation.type === CONVERSATION_TYPE.DIRECT
              ? listFriend[0].avatar
              : DEFAULT_GROUP_URI)
          }
        />
      }
      accessoryRight={<RightSection time={lastedMessage!.createdAt} />}
      style={[props.style, { height: 80 }]}
      onPress={navigateToChatRoom}
    />
  )
}

export default Conversation
