import { useState, useEffect } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { nanoid } from '@reduxjs/toolkit'

import { storage } from '@src/config'
import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
  UploadMetadata
} from 'firebase/storage'
import { getBlobFromUri } from '@src/utils'

export const useStorage = (file?: MediaLibrary.Asset, meta?: UploadMetadata) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<StorageError>()
  const [url, setUrl] = useState('')

  // runs every time the file value changes
  useEffect(() => {
    ;(async () => {
      if (file) {
        // storage ref
        const storageRef = ref(storage, `FIREBASE_STORAGE_ENDPOINT/${nanoid(8)}${file.filename}`)

        const blobFile = await getBlobFromUri(file.uri)

        const uploadTask = uploadBytesResumable(storageRef, blobFile, meta)
        uploadTask.on(
          'state_changed',
          snap => {
            // track the upload progress
            let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            setProgress(percentage)
          },
          err => {
            console.warn(err.code)
            setError(err)
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
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              console.log('File available at', downloadURL)
              setUrl(downloadURL)
            })
          }
        )
      }
    })()
  }, [file, meta])

  return { progress, url, error }
}
