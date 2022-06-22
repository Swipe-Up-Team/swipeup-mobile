/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */
import { RouteProp, useRoute } from '@react-navigation/native'
import { dispatch, getState } from '@src/common'
import { CloseIcon, NavigationBar } from '@src/components'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN, AuthorizeParamsList, RootStackParamList } from '@src/navigation/screen-types'
import {
  onSetSelectedAssetIndexes,
  onSetSystemAsset
} from '@src/store/reducers/system-assets-reducer'
import { fetchSystemImages } from '@src/utils'
import { Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'

export function GalleryChooserScreen({ isMultiple = true }: { isMultiple: boolean }) {
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.GALLERY_CHOOSER>>()
  const [loading, setLoading] = useState(true)
  const [galleryPage, setGalleryPage] = useState(1)
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const { systemAssets } = getState('systemAssets')

  useEffect(() => {
    if (route.params?.selectedAssets) {
      const indexes: number[] = []
      route.params?.selectedAssets.forEach(asset => {
        const idx = systemAssets.findIndex(item => item.id === asset.id)

        if (idx > -1) {
          indexes.push(idx)
        }
      })
      setSelectedIndexes(indexes)
    }
  }, [route.params?.selectedAssets, systemAssets])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await fetchSystemImages(galleryPage)

      if (Array.isArray(result)) {
        dispatch(onSetSystemAsset(result))
      }
      setLoading(false)
    })()
  }, [galleryPage])

  const handleLoadMoreAssets = () => {
    setGalleryPage(galleryPage + 1)
  }

  const onPressSelectImageHandler = (index: number) => {
    const _selectedIndexes = [...selectedIndexes]

    if (selectedIndexes.indexOf(index) > -1) {
      if (isMultiple === false) return setSelectedIndexes([])

      _selectedIndexes.splice(selectedIndexes.indexOf(index), 1)
      return setSelectedIndexes(_selectedIndexes)
    }

    if (isMultiple === false) return setSelectedIndexes([index])

    _selectedIndexes.push(index)
    setSelectedIndexes(_selectedIndexes)
  }

  /* TODO: open camera screen */
  // const onPressCameraHandler = () => {
  //   // navigate('Camera')
  // }

  const handleGoBack = () => {
    return navigate(route.params?.prevScreen || APP_SCREEN.ADD_POST, {
      selectedAssetIndexes: selectedIndexes
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar
        title={'Gallery'}
        accessoryRight={
          selectedIndexes.length > 0 && (
            <Button
              size="small"
              style={styles.doneButton}
              onPress={() => {
                dispatch(onSetSelectedAssetIndexes(selectedIndexes))
                handleGoBack()
              }}
            >
              Done
            </Button>
          )
        }
        iconLeft={<CloseIcon />}
        callback={goBack}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        bounces={false}
        onEndReached={handleLoadMoreAssets}
        numColumns={3}
        keyExtractor={item => item.id}
        data={systemAssets || []}
        contentContainerStyle={styles.cameraRollWrapper}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressSelectImageHandler(index)}
            style={{
              ...styles.cameraRollImageWrapper,
              borderWidth: selectedIndexes.indexOf(index) > -1 ? 4 : 0
            }}
            activeOpacity={1}
            key={index}
          >
            <Image style={styles.cameraRollImage} source={{ uri: item.uri }} />
            {selectedIndexes.indexOf(index) > -1 && (
              <View style={styles.selectedCount}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>
                  {selectedIndexes.indexOf(index) + 1}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
