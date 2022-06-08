import { NavigationBar } from '@src/components'
import { ExtraNotification } from '@src/models/notification'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from './components'
import styles from './styles'

const NOTIFICATIONS: ExtraNotification[] = [
  {
    userId: ['1', '2'],
    uid: 123,
    type: 1,
    froms: ['1', '2'],
    postId: 'post1',
    commentId: 34,
    replyId: 1,
    storyId: 2,
    createdAt: '2017-10-10',
    seen: 1
  },
  {
    userId: ['1', '2'],
    uid: 13,
    type: 1,
    froms: ['1', '2'],
    postId: 'post1',
    commentId: 34,
    replyId: 1,
    storyId: 2,
    createdAt: '2017-10-10',
    seen: 1
  },
  {
    userId: ['1', '2'],
    uid: 12,
    type: 1,
    froms: ['1', '2'],
    postId: 'post1',
    commentId: 34,
    replyId: 1,
    storyId: 2,
    createdAt: '2017-10-10',
    seen: 1
  },
  {
    userId: ['1', '2'],
    uid: 23,
    type: 1,
    froms: ['1', '2'],
    postId: 'post1',
    commentId: 34,
    replyId: 1,
    storyId: 2,
    createdAt: '2017-10-10',
    seen: 1
  }
]

export function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <NavigationBar showLeftIcon={false} title="Notifications" />
        <FlatList
          data={NOTIFICATIONS}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationCard key={item.uid} notification={item} />}
        />
        <Text style={styles.notiTitle}>New</Text>

        <Text style={styles.notiTitle}>Earlier</Text>
      </View>
    </SafeAreaView>
  )
}
