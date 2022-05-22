import ChatAvatar from '@src/screens/chat/components/chat-avatar'
import { Icon, Layout, ListItem } from '@ui-kitten/components'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './styles'

const BackIcon = (props: any) => (
  <TouchableOpacity>
    <Icon {...props} style={styles.backIcon} name="arrow-back-outline" fill="#000" />
  </TouchableOpacity>
)

const ActionIcon = ({ name, ...props }: any) => (
  <TouchableOpacity style={styles.actionIconContainer}>
    <Icon {...props} style={styles.actionIcon} name={name} fill="#5243AA" />
  </TouchableOpacity>
)

const RightSection = () => (
  <View style={styles.rightContainer}>
    <ActionIcon name="phone-call-outline" />
    <ActionIcon name="video-outline" />
  </View>
)

const TopHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <BackIcon />
      <ListItem
        {...props}
        disabled
        style={{width: '95%'}}
        title="Sender Name"
        description="Last seen 10:35"
        accessoryLeft={<ChatAvatar />}
        accessoryRight={<RightSection />}
      />
    </View>
  )
}

export default TopHeader
