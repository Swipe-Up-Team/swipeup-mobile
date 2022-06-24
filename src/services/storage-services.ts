import { nanoid } from '@reduxjs/toolkit'
import { storage } from '@src/config'
import { getBlobFromUri } from '@src/utils'
import * as MediaLibrary from 'expo-media-library'
import { getDownloadURL, ref, uploadBytesResumable, UploadTask } from 'firebase/storage'

export const storageService = {
  uploadMultipleFiles: async (files: MediaLibrary.AssetInfo[], path: string) => {
    const uploadPromises = files.map(async assets =>
      storageService.uploadSingleFile(assets, path, {})
    )
    const urls = await Promise.all(uploadPromises)
    return urls
  },
  uploadSingleFile: async (
    file: MediaLibrary.AssetInfo,
    path: string,
    { onProgress }: { onProgress?: (progress: number) => void }
  ): Promise<MediaLibrary.AssetInfo> => {
    const fileInfo = await MediaLibrary.getAssetInfoAsync(file.id)

    const storageRef = ref(storage, `${path}/${nanoid(8)}${file.filename.split('.')[0]}`)
    const blobFile = await getBlobFromUri(fileInfo.localUri || '')

    const uploadTask: UploadTask = uploadBytesResumable(storageRef, blobFile)
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

    return {
      ...file,
      uri: downloadUrl
    } as MediaLibrary.Asset
  }
}
