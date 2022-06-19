import { useSelector } from '@src/common'
import { MessageProfileIcon, PersonAddIcon, PersonDoneIcon } from '@src/components'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { userService } from '@src/services'
import { Button, Spinner } from '@ui-kitten/components'
import { cloneDeep } from 'lodash'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export const ActionButtonRow = ({ navigation, currentUser }: any) => {
  const { user } = useSelector(x => x.user)
  const [loading, setLoading] = useState(false)

  const handleToggleFollowBtn = async () => {
    setLoading(true)

    let newFollowingList: string[] = []

    if (user?.followingIDs?.includes(currentUser.id)) {
      newFollowingList = cloneDeep(user?.followingIDs)
      const index = newFollowingList.indexOf(currentUser.id)
      newFollowingList.splice(index, 1)
    } else {
      newFollowingList = user?.followingIDs?.concat(currentUser.id)!
    }

    await userService.updateFollowingList(user?.id!, newFollowingList)

    setLoading(false)
  }

  const handleSendMessage = () => {
    navigation.push(APP_SCREEN.CHAT_ROOM, {
      conversationId: undefined,
      friend: currentUser
    })
  }

  const renderAccessoryLeftFollowButton = () => {
    if (loading) return <></>

    if (!user?.followingIDs) return

    if (user.followingIDs.includes(currentUser.id)) return <PersonDoneIcon />

    return <PersonAddIcon />
  }

  const renderFollowButtonText = () => {
    if (loading) return 'Loading...'

    if (!user?.followingIDs) return

    if (user.followingIDs.includes(currentUser.id)) return 'Following'

    return 'Follow'
  }

  return (
    <View style={styles.container}>
      <Button
        size="small"
        style={styles.followBtn}
        accessoryLeft={renderAccessoryLeftFollowButton()}
        onPress={handleToggleFollowBtn}
        disabled={loading}
      >
        {renderFollowButtonText()}
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
