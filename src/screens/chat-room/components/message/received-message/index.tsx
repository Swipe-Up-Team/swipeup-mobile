import { View } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'
import { formatDate, formatTime } from '@src/utils'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ReceivedMessage = ({ message, date, displayTime, displayAvatar }: any) => {
  const [isShowTime, setIsShowTime] = useState(displayTime)

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

  return (
    <>
      {date && (
        <View style={styles.dateContainer}>
          <View style={styles.divider} />
          <Text style={styles.dateText}>{getDisplayDateText()}</Text>
          <View style={styles.divider} />
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
          <TouchableOpacity style={styles.messageContainer} onPress={changeDisplayTime}>
            <Text>{message.message}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default ReceivedMessage
