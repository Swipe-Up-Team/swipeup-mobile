import { View } from 'react-native'
import { Text, Avatar, IconElement, Icon } from '@ui-kitten/components'
import styles from './styles'

const SentMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>abcdhfahf f hiufehes fiusef sfue sefehsuf suie da uwdha dau dww</Text>
        </View>
        <View style={styles.statusContainer}>
          <SentIcon />
          <Text style={styles.timeText}>12:35</Text>
        </View>
      </View>
    </View>
  )
}

export const SentIcon = (style: any): IconElement => (
  <Icon {...style} style={{ width: 15, height: 15 }} name="done-all-outline" fill="#000" />
)

export const EyeIcon = (style: any): IconElement => (
  <Icon {...style} style={{ width: 15, height: 15 }} name="eye-outline" fill="#000" />
)

export default SentMessage
