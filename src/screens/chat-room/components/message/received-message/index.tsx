import { View, Image, ActivityIndicator } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'
import { formatDate, formatTime } from '@src/utils'
import React, { Component, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LoadingView } from '../../loading-message'

const ReceivedMessage = ({ message, date, displayTime, displayAvatar }: any) => {
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
          source={require('@assets/image/img-avatar.jpg')}
        />

        <View style={styles.mainContainer}>
          {isShowTime && <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>}
          {message.message ? (
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
          )}
        </View>
      </View>
    </>
  )
}

export default ReceivedMessage
