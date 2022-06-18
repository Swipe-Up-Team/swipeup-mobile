import { View, Text } from 'react-native'
import { Button } from '@ui-kitten/components'
import React from 'react'
import { MessageProfileIcon, PersonAddIcon, PersonDoneIcon } from '@src/components'
import styles from './styles'
import { useSelector } from '@src/common'
import { userService } from '@src/services'
import { cloneDeep } from 'lodash'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { chatService } from '@src/services/chat-service'

export const ActionButtonRow = ({ navigation, currentUser }: any) => {
  const { user } = useSelector(x => x.user)
  const conversationId = useSelector(
    x => x.chat.conversations.find(x => x.userIds.includes(currentUser.id))?.id
  )

  const handleToggleFollowBtn = async () => {
    let newFollowingList: string[] = []

    if (user?.followingIDs?.includes(currentUser.id)) {
      newFollowingList = cloneDeep(user?.followingIDs)
      const index = newFollowingList.indexOf(currentUser.id)
      newFollowingList.splice(index, 1)
    } else {
      newFollowingList = user?.followingIDs?.concat(currentUser.id)!
    }

    await userService.updateFollowingList(user?.id!, newFollowingList)
  }

  const handleSendMessage = async () => {
    let key = conversationId

    if (!key) {
      key = await chatService.createNewConversation(user?.id!, currentUser.id)
    }

    navigation.push(APP_SCREEN.CHAT_ROOM, {
      conversationId: key,
      friend: currentUser
    })
  }

  return (
    <View style={styles.container}>
      <Button
        size="small"
        style={styles.followBtn}
        accessoryLeft={
          user?.followingIDs?.includes(currentUser.id) ? <PersonDoneIcon /> : <PersonAddIcon />
        }
        onPress={handleToggleFollowBtn}
      >
        {user?.followingIDs?.includes(currentUser.id) ? 'Following' : 'Follow'}
      </Button>
      <Button
        size="small"
        appearance="outline"
        accessoryLeft={<MessageProfileIcon />}
        style={styles.messageBtn}
        onPress={handleSendMessage}
      >
        <Text>Message</Text>
      </Button>
    </View>
  )
}
