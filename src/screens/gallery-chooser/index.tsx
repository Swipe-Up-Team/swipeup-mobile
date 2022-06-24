/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */
import { RouteProp, useRoute } from '@react-navigation/native'
import { dispatch, getState } from '@src/common'
import { CloseIcon, NavigationBar } from '@src/components'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import {
  onSetSelectedAssetIndexes,
  onSetSystemAsset
} from '@src/store/reducers/system-assets-reducer'
import { updateAvatar } from '@src/store/reducers/user-reducer'
import { fetchSystemAssets, formatVideoDuration } from '@src/utils'
import { Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as MediaLibrary from 'expo-media-library'
import styles from './styles'
import { STORAGE_ENDPOINT } from '@src/constants'
import { storageService, userService } from '@src/services'
import { onEndProcess, onStartProcess } from '@src/store/reducers/app-reducer'

export function GalleryChooserScreen() {
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.GALLERY_CHOOSER>>()
  const [loading, setLoading] = useState(true)
  const [isMultiple, setIsMultiple] = useState(true)
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
      if (route.params?.isMultiple === undefined) {
        if (route.params?.mediaType === 'video' && isMultiple) setIsMultiple(false)
        if (route.params?.mediaType === 'photo' && !isMultiple) setIsMultiple(true)
      } else {
        setIsMultiple(route.params?.isMultiple)
      }

      setLoading(true)
      const result = await fetchSystemAssets(galleryPage, route.params?.mediaType)

      if (Array.isArray(result)) {
        dispatch(onSetSystemAsset(result))
      }
      setLoading(false)
    })()
  }, [galleryPage, route.params?.mediaType, route.params?.isMultiple])

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

  const handleUpdateAvatar = async () => {
    dispatch(onStartProcess())
    try {
      const newAvatar = systemAssets[selectedIndexes[0]]
      const uploadedImage = await storageService.uploadSingleFile(
        newAvatar,
        STORAGE_ENDPOINT.FILES,
        {}
      )
      dispatch(updateAvatar(uploadedImage.uri))
      await userService.updateAvatar(uploadedImage.uri)
    } catch (error) {
      console.log(error)
    }
    dispatch(onEndProcess())
  }

  const handleGoBack = async () => {
    const prevScreen = route.params?.prevScreen

    if (prevScreen === APP_SCREEN.PROFILE) {
      await handleUpdateAvatar()
      goBack()
    }

    return navigate(prevScreen || APP_SCREEN.ADD_POST, {
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
            {item.duration > 0 && (
              <View style={styles.duration}>
                <Text style={{ fontWeight: '600' }}>{formatVideoDuration(item.duration)}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
