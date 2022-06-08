import { Post } from '@src/models'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import GalleryImageItem from '../gallery-image-item'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
})

export interface AccountGalleryProps {
  photos: Post[]
  hidePopupImage: () => void
  showPopupImage: (e: { pX: number; pY: number; w: number; h: number }, photo: Post) => void
}
const AccountGallery = ({ photos, hidePopupImage, showPopupImage }: AccountGalleryProps) => {
  return (
    <View style={styles.container}>
      {photos &&
        photos.map((photo, index) =>
          photo.content.images?.map((image, indexImage) => (
            <GalleryImageItem
              _hidePopupImage={hidePopupImage}
              _showPopupImage={showPopupImage}
              key={index + indexImage}
              index={index + indexImage}
              photo={{
                ...photo,
                content: {
                  sharedPostId: photo.content.sharedPostId,
                  text: photo.content.text,
                  images: [image]
                }
              }}
            />
          ))
        )}
    </View>
  )
}

export default AccountGallery
