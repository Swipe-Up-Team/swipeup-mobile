import { View, Image } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'
import { formatDate, formatTime } from '@src/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'

const SentMessage = ({ message, displayDate, displayTime }: any) => {
  const [isShowTime, setIsShowTime] = useState(displayTime)

  const getDisplayDateText = () => {
    const now = new Date()
    const inputDate = new Date(message.createdAt)

    if (inputDate.getDate() === now.getDate()) {
      return 'Today'
    } else if (inputDate.getDate() === now.getDate() - 1) {
      return 'Yesterday'
    } else {
      return formatDate(displayDate)
    }
  }

  const changeDisplayTime = () => {
    if (!displayTime) {
      setIsShowTime(!isShowTime)
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
          {message.message ? (
            <TouchableOpacity style={styles.messageContainer} onPress={changeDisplayTime}>
              <Text style={styles.messageText}>{message.message}</Text>
            </TouchableOpacity>
          ) : (
            <Image style={styles.imageMessage} source={{ uri: message.image }} />
          )}
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

export const SentIcon = (style: any): IconElement => (
  <Icon {...style} style={{ width: 15, height: 15 }} name="done-all-outline" fill="#000" />
)

export const EyeIcon = (style: any): IconElement => (
  <Icon {...style} style={{ width: 15, height: 15 }} name="eye-outline" fill="#000" />
)

export default SentMessage
