import { RouteProp, useRoute } from '@react-navigation/native'
import { getState } from '@src/common'
import { NavigationBar } from '@src/components'
import { goBack } from '@src/navigation/navigation-service'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import { SearchItem } from '@src/screens/search/components/search-item'
import { List } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'

export const GroupMemberScreen = ({ navigation }: any) => {
  const user = getState('user').user

  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.GROUP_MEMBER>>()
  const listMembers = route.params.listMembers

  const renderItem = ({ item }: any) => <SearchItem user={item} navigation={navigation} />

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title={'Members'} callback={() => goBack()} />
      <List
        style={styles.list}
        data={listMembers}
        ListHeaderComponent={<SearchItem user={user} navigation={navigation} />}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}
