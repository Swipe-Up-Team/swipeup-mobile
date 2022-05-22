import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { onSetToken } from '@src/store/app-reducer'
import { dispatch } from '@src/common'
import Toast from 'react-native-toast-message'

export function Home() {
  return (
    <View>
      <Pressable onPress={() => dispatch(onSetToken())}>
        <Text>Remove token</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
          })
        }
      >
        <Text>Show toast</Text>
      </Pressable>
    </View>
  )
}
