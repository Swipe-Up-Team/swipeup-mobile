import { Image, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 80
    // height: '100%',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  text: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '400'
  },
  boldText: {
    fontWeight: '500',
    fontSize: 18
  }
})

const EmptyCommentComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image style={styles.image} source={require('@assets/image/no-comment.png')} />
      <Text style={[styles.text, styles.boldText]}>No comments yet</Text>
      <Text style={[styles.text]}>Be the first to comment.</Text>
    </View>
  )
}
export const EmptyComment = memo(EmptyCommentComponent, isEqual)
