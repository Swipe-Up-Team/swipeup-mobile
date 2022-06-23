import React from 'react'
import {
  BottomSheet,
  GalleryIcon,
  MoreIcon,
  PersonGroupIcon,
  ShareIcon,
  GreenPersonAddIcon
} from '@src/components'
import { View, Text } from 'react-native'
import { Avatar, Button } from '@ui-kitten/components'
import styles from './styles'
import { ActionBtn } from './action-button'
import { DEFAULT_GROUP_URI, DEFAULT_PHOTO_URI } from '@src/constants'
import { RouteProp, useRoute } from '@react-navigation/native'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import { chatService } from '@src/services/chat-service'
import { getState, useSelector } from '@src/common'
import { CONVERSATION_TYPE } from '@src/models'
import { shortenConversationText } from '@src/utils'

export const InfoBottomSheet = ({ navigation }: any) => {
  const userId = getState('user').user?.id

  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.CHAT_USER_INFO_MODAL>>()

  const conversationType = route.params?.conversationType
  const conversationId = route.params?.conversationId

  const listMembers =
    useSelector(x => x.chat.conversationMembers.find(con => con.conversationId === conversationId))
      ?.members || []

  const navigateToProfile = () => {
    navigation.push(APP_SCREEN.PROFILE, { userId: listMembers[0].id })
  }

  const navigateToGroupMember = () => {
    navigation.push(APP_SCREEN.GROUP_MEMBER, { listMembers: listMembers })
  }

  const navigateToAddMember = () => {
    navigation.push(APP_SCREEN.ADD_MEMBER, {
      conversationId: conversationId
    })
  }

  const createNewGroup = async () => {
    const key = await chatService.createNewConversation(
      userId!,
      listMembers[0].id,
      CONVERSATION_TYPE.GROUP
    )

    navigation.push(APP_SCREEN.CHAT_ROOM, {
      conversationId: key,
      listFriend: [listMembers[0]]
    })
  }

  const getGroupName = () => {
    const listNames = listMembers.map(fr => fr.name).join(', ')
    return shortenConversationText(`[Group]: ${listNames}`)
  }

  const renderDirectView = () => {
    return (
      <>
        <Avatar
          style={styles.avatarImage}
          width={100}
          height={100}
          shape="rounded"
          source={{ uri: listMembers[0].avatar || DEFAULT_PHOTO_URI, cache: 'force-cache' }}
        />
        <Text style={styles.nameText}>{listMembers[0].name}</Text>
        <Text style={styles.emailText}>{listMembers[0].email}</Text>
        <View style={styles.actionBtnContainer}>
          <ActionBtn
            icon={<PersonGroupIcon />}
            backgroundColor={'#fffae6'}
            description={'Group'}
            onPress={createNewGroup}
          />
          <ActionBtn
            icon={<GalleryIcon />}
            backgroundColor={'#eae6ff'}
            description={'Gallery'}
            onPress={() => {}}
          />
          <ActionBtn
            icon={<ShareIcon />}
            backgroundColor={'#deebff'}
            description={'Share'}
            onPress={() => {}}
          />
          <ActionBtn
            icon={<MoreIcon />}
            backgroundColor={'#f4f5f7'}
            description={'More'}
            onPress={() => {}}
          />
        </View>
        <Button
          style={styles.profileBtn}
          status={'basic'}
          appearance="outline"
          onPress={navigateToProfile}
        >
          <Text>View Profile</Text>
        </Button>
      </>
    )
  }

  const renderGroupView = () => {
    return (
      <>
        <Avatar
          style={styles.avatarImage}
          width={100}
          height={100}
          shape="rounded"
          source={{ uri: DEFAULT_GROUP_URI, cache: 'force-cache' }}
        />
        <Text style={styles.nameText}>{getGroupName()}</Text>
        <View style={styles.actionBtnContainer}>
          <ActionBtn
            icon={<GreenPersonAddIcon />}
            backgroundColor={'#e2ffee'}
            description={'Add'}
            onPress={navigateToAddMember}
          />
          <ActionBtn
            icon={<GalleryIcon />}
            backgroundColor={'#eae6ff'}
            description={'Gallery'}
            onPress={() => {}}
          />
          <ActionBtn
            icon={<PersonGroupIcon />}
            backgroundColor={'#fffae6'}
            description={'Member'}
            onPress={navigateToGroupMember}
          />
          <ActionBtn
            icon={<MoreIcon />}
            backgroundColor={'#f4f5f7'}
            description={'More'}
            onPress={() => {}}
          />
        </View>
      </>
    )
  }

  return (
    <BottomSheet>
      <View style={styles.container}>
        {conversationType === CONVERSATION_TYPE.DIRECT ? renderDirectView() : renderGroupView()}
      </View>
    </BottomSheet>
  )
}
