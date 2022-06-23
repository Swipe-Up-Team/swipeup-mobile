import React from 'react'
import ExpoFastImage from 'expo-fast-image'
import { DEFAULT_PHOTO_URI, USERIDS_DIVIDER } from '@src/constants'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from './styles'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { Button } from '@ui-kitten/components'
import { chatService } from '@src/services/chat-service'

export const AddMemberItem = ({ user, conversation, navigation }: any) => {
  const onItemClick = () => {
    navigation.push(APP_SCREEN.PROFILE, { userId: user.id })
  }

  const addMember = async () => {
    const currentUserIds = conversation?.userIds.split(USERIDS_DIVIDER)
    currentUserIds?.push(user.id)
    await chatService.addMemberToGroup(currentUserIds.join(USERIDS_DIVIDER), conversation.id)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.insideContainer} onPress={onItemClick}>
        <ExpoFastImage
          style={styles.mainAvatar}
          source={{
            uri: user.avatar || DEFAULT_PHOTO_URI,
            cache: 'force-cache'
          }}
        />
        <Text style={styles.nameText}>{user.name}</Text>
      </TouchableOpacity>
      <Button size={'small'} appearance="outline" style={styles.addBtn} onPress={addMember}>
        Add
      </Button>
    </View>
  )
}
