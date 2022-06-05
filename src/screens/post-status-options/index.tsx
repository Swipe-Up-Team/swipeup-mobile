import { BottomSheet } from '@src/components'
import React from 'react'
import { Text, View } from 'react-native'
import styles from '@src/components/bottom-sheet/styles'

export const PostStatusOptionsScreen = ({}) => {
  return (
    <BottomSheet title="Edit Status">
      <View>
        <View style={styles.optionItem}>
          <Text style={styles.optionItemText}>Public</Text>
        </View>
        <View style={styles.optionItem}>
          <Text style={styles.optionItemText}>Private</Text>
        </View>
      </View>
      <Text style={styles.smallDescription}>We won't show this post on another user's feed.</Text>
    </BottomSheet>
  )
}
