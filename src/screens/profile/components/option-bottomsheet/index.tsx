import React from 'react'
import { BottomSheet, LogoutIcon } from '@src/components'
import { View } from 'react-native'
import styles from './styles'
import { Text } from '@ui-kitten/components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { dispatch } from '@src/common'
import { onSetToken } from '@src/store/reducers/app-reducer'
import { onSetUser } from '@src/store/reducers/user-reducer'
import { onClearChatState } from '@src/store/reducers/chat-reducer'

export const ProfileOptionBottomSheet = () => {
  const logout = () => {
    dispatch(onSetToken(undefined))
    dispatch(onSetUser(undefined))
    dispatch(onClearChatState())
  }

  return (
    <BottomSheet title="Settings">
      <TouchableOpacity style={styles.optionItem} onPress={logout}>
        <View style={styles.optionItemIcon}>
          <LogoutIcon />
        </View>
        <View style={styles.optionItemContent}>
          <Text status={'danger'} style={[styles.optionItemText]}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </BottomSheet>
  )
}
