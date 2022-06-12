import { View, StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import React from 'react'
import { MessageProfileIcon, PersonAddIcon } from '@src/components'
import styles from './styles'

export const ActionButtonRow = () => (
  <View style={styles.container}>
    <Button
      size="small"
      style={styles.followBtn}
      accessoryLeft={<PersonAddIcon />}
      onPress={() => { } }
    >
      Follow
    </Button>
    <Button
      size="small"
      appearance="outline"
      accessoryLeft={<MessageProfileIcon />}
      style={styles.messageBtn}
      onPress={() => { } }
    >
      Message
    </Button>
  </View>
)
