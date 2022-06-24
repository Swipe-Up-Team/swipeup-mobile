import { RouteProp, useRoute } from '@react-navigation/native'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import styles from './styles'

export const ImageDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.IMAGE_DETAIL>>()
  const uri = route.params.imageUrl || ''

  return (
    <View style={styles.container}>
      <Image style={styles.image} uri={uri} />
    </View>
  )
}
