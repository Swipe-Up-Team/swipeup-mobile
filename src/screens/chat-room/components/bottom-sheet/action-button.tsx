import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './styles'

interface Props {
  icon: React.ReactNode
  backgroundColor: string
  description: string
}

export const ActionBtn = ({ icon, backgroundColor, description }: Props) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <View style={[styles.actionBtn, { backgroundColor: backgroundColor }]}>{icon}</View>
      <Text style={styles.descText}>{description}</Text>
    </TouchableOpacity>
  )
}
