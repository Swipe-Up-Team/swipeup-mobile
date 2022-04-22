import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function GoogleSignInButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.btnContainer} onPress={onPress}>
      {/* TODO: missing Google's logo */}
      <Text style={styles.btnText}>Sign in with Google</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F6',
    paddingVertical: 18,
    borderRadius: 4
  },
  btnText: {
    color: '#3C4C69',
    fontSize: 16,
    fontWeight: '500'
  }
})
