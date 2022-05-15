import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { onSetToken } from '@src/store/app-reducer'
import { dispatch } from '@src/common'

export function Home() {
  return (
    <View>
      <Pressable onPress={() => dispatch(onSetToken(''))}>
        <Text>Remove token</Text>
      </Pressable>
    </View>
  )
}
