/* eslint-disable react-hooks/exhaustive-deps */
import { getState } from '@src/common'
import { ChatSearchIcon } from '@src/components'
import { User } from '@src/models'
import { userService } from '@src/services'
import { Input, List, Spinner, Text } from '@ui-kitten/components'
import React, { useCallback, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchItem } from './components/search-item'
import styles from './styles'

export function SearchScreen({ navigation }: any) {
  const userId = getState('user').user?.id

  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [firstAccess, setFirstAccess] = useState(true)

  const onSubmitSearch = async () => {
    if (!searchText) return

    setLoading(true)
    const result = await userService.getUsersWithKeyWord(userId!, searchText)

    if (firstAccess) setFirstAccess(false)

    setLoading(false)
    setSearchData(result)
  }

  const renderSearchItem = ({ item }: any) => <SearchItem user={item} navigation={navigation} />
  const ListEmptyComponent = () => (
    <View style={styles.noResultContainer}>
      <Image style={styles.banner} source={require('@assets/image/no-data.png')} />
      <Text style={styles.noResultTitle}>No Results</Text>
      <Text appearance="hint">Sorry, there are no results for this search,</Text>
      <Text appearance="hint">please try another phase.</Text>
    </View>
  )

  const renderMainContent = useCallback(() => {
    if (firstAccess)
      return (
        <View style={styles.noResultContainer}>
          <Image style={styles.banner} source={require('@assets/image/search-banner.png')} />
          <Text style={styles.bannerTitle}>Search for Peoples, Topics & Keywords</Text>
          <Text appearance="hint">Filter search result by specific keywords</Text>
        </View>
      )

    if (loading)
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size="medium" />
        </View>
      )

    return (
      <List
        style={styles.searchList}
        data={searchData}
        renderItem={renderSearchItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    )
  }, [firstAccess, loading, searchData])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <Input
            autoFocus
            style={styles.input}
            placeholder="Find your friends"
            accessoryLeft={<ChatSearchIcon />}
            value={searchText}
            onChangeText={nextValue => setSearchText(nextValue)}
            onSubmitEditing={onSubmitSearch}
          />

          {renderMainContent()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
