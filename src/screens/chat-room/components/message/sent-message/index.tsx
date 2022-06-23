import { View, Image } from 'react-native'
import { Text } from '@ui-kitten/components'
import styles from './styles'
import { formatDate, formatTime } from '@src/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { useState } from 'react'
import { LoadingView } from '../../loading-message'
import { MESSAGE_TYPE } from '@src/models'
import { SentIcon } from '@src/components'

const SentMessage = ({ message, displayDate, displayTime }: any) => {
  const [isShowTime, setIsShowTime] = useState(displayTime)
  const [isLoadingImage, setIsLoadingImage] = useState(false)

  const getDisplayDateText = () => {
    const now = new Date()
    const inputDate = new Date(message.createdAt)

    if (inputDate.getDate() === now.getDate()) {
      return 'Today'
    } else if (inputDate.getDate() === now.getDate() - 1) {
      return 'Yesterday'
    } else {
      return formatDate(message.createdAt)
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
            <Text style={styles.messageText}>{message.message}</Text>
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
      {displayDate && (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getDisplayDateText()}</Text>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.mainTextContainer}>
          {renderMessageContent()}
          {isShowTime && (
            <View style={styles.statusContainer}>
              <SentIcon />
              <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default SentMessage
