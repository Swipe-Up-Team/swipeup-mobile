import React from 'react'
import { BottomSheet, LogoutIcon } from '@src/components'
import { View } from 'react-native'
import styles from './styles'
import { Text } from '@ui-kitten/components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { dispatch } from '@src/common'
import { onSetToken } from '@src/store/reducers/app-reducer'

export const ProfileOptionBottomSheet = () => {
  const logout = () => {
    dispatch(onSetToken(undefined))
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
