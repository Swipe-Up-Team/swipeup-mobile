import { View, Text } from 'react-native'
import { Button } from '@ui-kitten/components'
import React from 'react'
import { MessageProfileIcon, PersonAddIcon, PersonDoneIcon } from '@src/components'
import styles from './styles'
import { useSelector } from '@src/common'
import { userService } from '@src/services'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { cloneDeep } from 'lodash'

export const ActionButtonRow = ({ currentUser }: any) => {
  const { user } = useSelector(x => x.user)

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
        onPress={() => {console.log('abcd')}}
      >
        <Text>Message</Text>
      </Button>
    </View>
  )
}
