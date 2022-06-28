import { Avatar } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import React from 'react'

const CHATBOT_AVATAR = require('@assets/icon/icon-robot.png')

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 6
  }
})

interface Props {
  size: string
}

export const ChatBotAvatar = ({ size }: Props) => (
  <Avatar style={styles.avatar} size={size} shape="rounded" source={CHATBOT_AVATAR} />
)
