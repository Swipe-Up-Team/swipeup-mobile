import { ArrowBack } from '@src/components'
import { goBack } from '@src/navigation/navigation-service'
import { Input } from '@ui-kitten/components'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'

export function SearchScreen(): JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
          <ArrowBack />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <Input />
        </View>
      </View>
      <ScrollView style={styles.mainContent}>
        <View style={styles.recentSearchedContainer}>
          <Text style={styles.title}>Recent searched</Text>
        </View>
        {/* Search input */}
      </ScrollView>
    </SafeAreaView>
  )
}
