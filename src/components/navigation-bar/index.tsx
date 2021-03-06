import { Text } from '@ui-kitten/components'
import React, { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ArrowBack } from '../icons'
import styles from './styles'

export interface NavigationBarProps {
  iconLeft?: JSX.Element
  showLeftIcon?: boolean
  accessoryRight?: ReactNode
  title: ReactNode | string
  callback?: () => any
}
export const NavigationBar = ({
  accessoryRight,
  iconLeft,
  showLeftIcon = true,
  callback,
  title
}: NavigationBarProps) => {
  const onCallBack = () => {
    if (callback) callback()
  }

  return (
    <View style={styles.navigationBar}>
      {showLeftIcon && (
        <TouchableOpacity onPress={onCallBack} style={styles.btnBack}>
          {iconLeft ? iconLeft : <ArrowBack />}
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        {typeof title === 'string' ? <Text style={styles.title}>{title}</Text> : title}
      </View>
      <View style={styles.accessoryRight}>{accessoryRight}</View>
    </View>
  )
}
