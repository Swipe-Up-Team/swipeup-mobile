import { View, Image } from 'react-native'
import { Text, Avatar } from '@ui-kitten/components'
import styles from './styles'
import { formatDate, formatTime } from '@src/utils'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LoadingView } from '../../loading-message'
import { BOT_ID, CHATBOT_AVATAR, DEFAULT_PHOTO_URI } from '@src/constants'
import { CONVERSATION_TYPE, MESSAGE_TYPE } from '@src/models'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'

const ReceivedMessage = ({
  message,
  date,
  displayTime,
  displayAvatar,
  friend,
  conversationType
}: any) => {
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

  const navigateToImageDetail = () => {
    navigate(APP_SCREEN.IMAGE_DETAIL, { imageUrl: message.image })
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
          <TouchableOpacity onPress={navigateToImageDetail}>
            <Image
              style={styles.imageMessage}
              source={{ uri: message.image }}
              onLoadStart={changeLoadingState}
              onLoadEnd={changeLoadingState}
            />
            {isLoadingImage && <LoadingView />}
          </TouchableOpacity>
        )
      default:
        break
    }
  }

  const getMessageTitle = () => {
    return conversationType === CONVERSATION_TYPE.GROUP
      ? friend.name + ', ' + formatTime(message.createdAt)
      : formatTime(message.createdAt)
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
          source={
            friend.id === BOT_ID
              ? CHATBOT_AVATAR
              : {
                  uri: friend.avatar || DEFAULT_PHOTO_URI,
                  cache: 'force-cache'
                }
          }
        />

        <View style={styles.mainContainer}>
          {isShowTime && <Text style={styles.timeText}>{getMessageTitle()}</Text>}
          {renderMessageContent()}
        </View>
      </View>
    </>
  )
}

export default ReceivedMessage
