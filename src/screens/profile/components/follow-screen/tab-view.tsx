import { ChatSearchIcon, XIcon } from '@src/components'
import { User } from '@src/models'
import { SearchItem } from '@src/screens/search/components/search-item'
import { Input, List } from '@ui-kitten/components'
import React, { useState } from 'react'
import styles from './styles'

interface Props {
  listUser: User[]
  navigation: any
}

export const TabUserView = ({ listUser, navigation }: Props) => {
  const [searchUser, setSearchUser] = useState('')
  const [searchUserList, setSearchUserList] = useState<User[]>([])

  const onSearchUser = () => {
    if (searchUser.trim().length === 0) {
      setSearchUser('')
      return
    }

    const result = listUser.filter(user =>
      user.name.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase())
    )

    setSearchUserList(result)
  }

  const resetList = () => {
    setSearchUser('')
    setSearchUserList([])
  }

  const renderItem = ({ item }: any) => <SearchItem user={item} navigation={navigation} />

  return (
    <>
      <Input
        style={styles.input}
        placeholder="Find in list"
        accessoryLeft={<ChatSearchIcon />}
        accessoryRight={<XIcon onPress={resetList} />}
        value={searchUser}
        onChangeText={nextValue => setSearchUser(nextValue)}
        onSubmitEditing={onSearchUser}
      />
      <List
        style={{ backgroundColor: '#fff' }}
        data={searchUserList.length !== 0 ? searchUserList : listUser}
        renderItem={renderItem}
      />
    </>
  )
}
