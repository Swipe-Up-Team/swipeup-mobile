import { Text } from '@ui-kitten/components'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ArrowBack } from '../icons'
import styles from './styles'

export interface NavigationBarProps {
  title: string
  callback?: () => any
}
export const NavigationBar = ({ callback, title }: NavigationBarProps) => {
  const onCallBack = () => {
    if (callback) callback()
  }
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={onCallBack} style={styles.btnBack}>
        <ArrowBack />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}
