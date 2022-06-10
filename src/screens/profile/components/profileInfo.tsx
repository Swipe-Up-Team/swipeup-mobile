import { User } from '@src/models'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  bioWrapper: {
    paddingHorizontal: 35,
    marginVertical: 15
  },
  text_medium: {
    fontWeight: '500'
  }
})

interface Props {
  user: User
}

export default function ProfileInfo({ user }: Props) {
  return (
    <View style={styles.bioWrapper}>
      <Text style={styles.text_medium}>{user.name}</Text>
      <Text>{user.bio}</Text>
    </View>
  )
}
