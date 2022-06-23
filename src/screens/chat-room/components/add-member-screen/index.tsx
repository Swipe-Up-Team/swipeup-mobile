import { RouteProp, useRoute } from '@react-navigation/native'
import { useSelector } from '@src/common'
import { ChatSearchIcon, NavigationBar, XIcon } from '@src/components'
import { USERIDS_DIVIDER } from '@src/constants'
import { User } from '@src/models'
import { goBack } from '@src/navigation/navigation-service'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import { Input, List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddMemberItem } from '../add-item'
import styles from './styles'

export const AddMemberScreen = ({ navigation }: any) => {
  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.ADD_MEMBER>>()

  const conversationId = route.params.conversationId

  const listMembers =
    useSelector(x => x.chat.conversationMembers.find(con => con.conversationId === conversationId))
      ?.members || []

  const followingUsers = useSelector(x => x.user).followingUsers
  const conversation = useSelector(x => x.chat).conversations.find(
    conver => conver.id === conversationId
  )

  const [searchUser, setSearchUser] = useState('')
  const [userList, setUserList] = useState<User[]>([])

  const onSearchUser = () => {
    if (searchUser.trim().length === 0) {
      setSearchUser('')
      return
    }

    const result = userList.filter(user =>
      user.name.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase())
    )

    setUserList(result)
  }

  const getAddUserList = () => {
    const listMemberId = listMembers.map(member => member.id)
    return followingUsers?.filter(user => !listMemberId.includes(user.id))
  }

  const resetList = () => {
    setSearchUser('')
    setUserList(getAddUserList() || [])
  }

  const renderItem = ({ item }: any) => (
    <AddMemberItem user={item} conversation={conversation} navigation={navigation} />
  )

  useEffect(() => {
    setUserList(getAddUserList() || [])
  }, [followingUsers, listMembers])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title={'Add Member'} callback={() => goBack()} />
      <Input
        style={styles.input}
        placeholder="Find in list"
        accessoryLeft={<ChatSearchIcon />}
        accessoryRight={<XIcon onPress={resetList} />}
        value={searchUser}
        onChangeText={nextValue => setSearchUser(nextValue)}
        onSubmitEditing={onSearchUser}
      />
      <List style={styles.list} data={userList} renderItem={renderItem} />
    </SafeAreaView>
  )
}
