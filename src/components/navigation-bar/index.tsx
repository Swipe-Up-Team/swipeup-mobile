import { Text } from '@ui-kitten/components'
import React, { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ArrowBack } from '../icons'
import styles from './styles'

export interface NavigationBarProps {
  iconLeft?: JSX.Element
  accessoryRight?: ReactNode
  title: string
  callback?: () => any
}
export const NavigationBar = ({
  accessoryRight,
  iconLeft,
  callback,
  title
}: NavigationBarProps) => {
  const onCallBack = () => {
    if (callback) callback()
  }

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={onCallBack} style={styles.btnBack}>
        {iconLeft ? iconLeft : <ArrowBack />}
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.accessoryRight}>{accessoryRight}</View>
    </View>
  )
}
