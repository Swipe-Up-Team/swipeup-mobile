import { nanoid } from '@reduxjs/toolkit'
import { storage } from '@src/config'
import { FIREBASE_STORAGE_ENDPOINT } from '@src/constants'
import { getBlobFromUri } from '@src/utils'
import * as MediaLibrary from 'expo-media-library'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const firebaseService = {
  uploadMultipleFiles: async (files: MediaLibrary.AssetInfo[]) => {
    const uploadPromises = files.map(async assets => firebaseService.uploadSingleFile(assets, {}))
    const urls = await Promise.all(uploadPromises)
    return urls
  },
  uploadSingleFile: async (
    file: MediaLibrary.AssetInfo,
    { onProgress }: { onProgress?: (progress: number) => void }
  ) => {
    const storageRef = ref(storage, `${FIREBASE_STORAGE_ENDPOINT.FILES}/${nanoid(8)}`)
    const blobFile = await getBlobFromUri(file.uri)
    const uploadTask = uploadBytesResumable(storageRef, blobFile)
    uploadTask.on(
      'state_changed',
      snap => {
        // track the upload progress
        if (onProgress) {
          let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
          onProgress(percentage)
        }
      },
      err => {
        console.warn(err.code)
        switch (err.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
        // throw err.code
        return ''
      }
    )
    await uploadTask

    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)

    return downloadUrl
  }
}
