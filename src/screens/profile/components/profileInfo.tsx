import { User } from '@src/models'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  bioWrapper: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontWeight: '500',
    fontSize: 20
  },
  emailText: {
    color: 'grey',
    marginTop: 4
  }
})

interface Props {
  user: User
}

export default function ProfileInfo({ user }: Props) {
  return (
    <View style={styles.bioWrapper}>
      <Text style={styles.nameText}>{user.name}</Text>
      <Text style={styles.emailText}>{user.email}</Text>
    </View>
  )
}
