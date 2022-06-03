import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  lightText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '600'
  }
})

export const EmptyComment = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={[styles.lightText]}>
        No comments on this post yet. Be the first one to comment.
      </Text>
    </View>
  )
}
