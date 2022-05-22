import { goBack } from '@src/navigation/navigation-service'
import { Icon } from '@ui-kitten/components'
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export const BackIcon = (props: any) => (
  <TouchableOpacity
    onPress={() => {
      goBack()
    }}
  >
    <Icon {...props} style={styles.backIcon} name="arrow-back-outline" fill="#000" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  backIcon: {
    width: 30,
    height: 30
  }
})
