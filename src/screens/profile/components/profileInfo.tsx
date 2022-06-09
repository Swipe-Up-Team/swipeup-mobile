import { useSelector } from '@src/common'
import { User } from '@src/models'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  bioWrapper: {
    paddingHorizontal: 15,
    marginVertical: 10
  },
  text_medium: {
    fontWeight: '500'
  }
})

export default function ProfileInfo() {
  const user = useSelector(state => state.user).user as User

  return (
    <View style={styles.bioWrapper}>
      <Text style={styles.text_medium}>{user.name}</Text>
      <Text>{user.bio}</Text>
    </View>
  )
}
