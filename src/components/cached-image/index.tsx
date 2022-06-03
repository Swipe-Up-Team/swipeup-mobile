import * as FileSystem from 'expo-file-system'
import React, { useEffect, useRef, useState } from 'react'
import { Image, ImageProps } from 'react-native'

interface CachedImageProps extends ImageProps {
  source: {
    uri: string
  }
  cacheKey: string
}

export const CachedImage = (props: CachedImageProps) => {
  const {
    source: { uri },
    cacheKey
  } = props
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`

  const [imgURI, setImgURI] = useState<string>(filesystemURI)

  const componentIsMounted = useRef(true)

  useEffect(() => {
    const loadImage = async ({ fileURI }: { fileURI: string }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI)
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null)
            await FileSystem.downloadAsync(uri, fileURI)
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI)
          }
        }
      } catch (err) {
        setImgURI(uri)
      }
    }

    loadImage({ fileURI: filesystemURI })

    return () => {
      componentIsMounted.current = false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Image
      {...props}
      source={{
        uri: imgURI
      }}
    />
  )
}
