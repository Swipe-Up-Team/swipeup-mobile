import { ArrowBack, ChatSearchIcon, DismissKeyboardView } from '@src/components'
import { User } from '@src/models'
import { goBack } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { userService } from '@src/services'
import { Input, Layout, List } from '@ui-kitten/components'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchItem } from './components/search-item'
import styles from './styles'

export function SearchScreen({ navigation }: any): JSX.Element {
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState<User[]>([])

  const onSubmitSearch = async () => {
    if (!searchText) return
    const result = await userService.getUsersWithKeyWord(searchText)
    setSearchData(result)
  }

  const renderSearchitem = ({ item }: any) => <SearchItem user={item} navigation={navigation} />

  return (
    <DismissKeyboardView>
      <Layout style={styles.container}>
        <Input
          style={styles.input}
          placeholder="Find your friends"
          accessoryLeft={<ChatSearchIcon />}
          value={searchText}
          onChangeText={nextValue => setSearchText(nextValue)}
          onSubmitEditing={onSubmitSearch}
        />

        <List style={styles.searchList} data={searchData} renderItem={renderSearchitem} />
      </Layout>
    </DismissKeyboardView>
  )
}
