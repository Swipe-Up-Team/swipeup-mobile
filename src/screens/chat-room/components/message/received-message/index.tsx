import { View, Image } from 'react-native'
import { Text, Avatar } from '@ui-kitten/components'
import styles from './styles'
import { formatDate, formatTime } from '@src/utils'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LoadingView } from '../../loading-message'
import { DEFAULT_PHOTO_URI } from '@src/constants'
import { MESSAGE_TYPE } from '@src/models'

const ReceivedMessage = ({ message, date, displayTime, displayAvatar, friend }: any) => {
  const [isShowTime, setIsShowTime] = useState(displayTime)
  const [isLoadingImage, setIsLoadingImage] = useState(false)

  const getDisplayDateText = () => {
    const now = new Date()
    const inputDate = new Date(date)

    if (inputDate.getDate() === now.getDate()) {
      return 'Today'
    } else if (inputDate.getDate() === now.getDate() - 1) {
      return 'Yesterday'
    } else {
      return formatDate(date)
    }
  }

  const changeDisplayTime = () => {
    if (!displayTime) {
      setIsShowTime(!isShowTime)
    }
  }

  const changeLoadingState = () => {
    setIsLoadingImage(!isLoadingImage)
  }

  const renderMessageContent = () => {
    switch (message.type) {
      case MESSAGE_TYPE.MESSAGE:
        return (
          <TouchableOpacity style={styles.messageContainer} onPress={changeDisplayTime}>
            <Text>{message.message}</Text>
          </TouchableOpacity>
        )
      case MESSAGE_TYPE.IMAGE:
        return (
          <>
            <Image
              style={styles.imageMessage}
              source={{ uri: message.image }}
              onLoadStart={changeLoadingState}
              onLoadEnd={changeLoadingState}
            />
            {isLoadingImage && <LoadingView />}
          </>
        )
      default:
        break
    }
  }

  return (
    <>
      {date && (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getDisplayDateText()}</Text>
        </View>
      )}

      <View style={styles.container}>
        <Avatar
          style={displayAvatar ? styles.avatar : [styles.avatar, { opacity: 0 }]}
          size="medium"
          borderRadius={4}
          source={{
            uri: friend.avatar || DEFAULT_PHOTO_URI,
            cache: 'force-cache'
          }}
        />

        <View style={styles.mainContainer}>
          {isShowTime && <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>}
          {/* {message.message ? (
            <TouchableOpacity style={styles.messageContainer} onPress={changeDisplayTime}>
              <Text>{message.message}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Image
                style={styles.imageMessage}
                source={{ uri: message.image }}
                onLoadStart={changeLoadingState}
                onLoadEnd={changeLoadingState}
              />
              {isLoadingImage && <LoadingView />}
            </>
          )} */}
          {renderMessageContent()}
        </View>
      </View>
    </>
  )
}

export default ReceivedMessage
