import { PostDeleteAssetIcon } from '@src/components'
import * as MediaLibrary from 'expo-media-library'
import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import styles from '../styles'
// import { Image } from 'react-native-expo-image-cache'

export function ChoseAsset({ item, onRemove }: { item: MediaLibrary.Asset; onRemove: () => void }) {
  return (
    <View key={item.id} style={styles.selectedAssetItem}>
      <Image source={{ uri: item.uri }} style={styles.selectedAssetImage} />
      <TouchableOpacity onPress={onRemove} style={styles.deleteAssetIconWrapper}>
        <PostDeleteAssetIcon />
      </TouchableOpacity>
    </View>
  )
}
