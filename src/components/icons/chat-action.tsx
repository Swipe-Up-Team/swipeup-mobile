import { Icon } from '@ui-kitten/components'
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export const ChatActionIcon = ({ name, ...props }: any) => (
  <TouchableOpacity style={styles.actionIconContainer}>
    <Icon {...props} style={styles.actionIcon} name={name} fill="#5243AA" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  actionIconContainer: {
    marginRight: 6,
    padding: 6,
    borderRadius: 4
    // borderWidth: 1,
    // borderColor: '#999',
  },
  actionIcon: {
    width: 24,
    height: 24
  }
})
