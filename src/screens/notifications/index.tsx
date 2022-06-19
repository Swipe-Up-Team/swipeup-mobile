/* eslint-disable react-hooks/exhaustive-deps */
import { dispatch } from '@src/common'
import { NavigationBar } from '@src/components'
import { Notification } from '@src/models'
import { notificationService } from '@src/services'
import { onSetLastSeenNotification } from '@src/store/reducers/notification-reducer'
import { Spinner, Text } from '@ui-kitten/components'
import { Unsubscribe } from 'firebase/firestore'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from './components'
import styles from './styles'

export function NotificationsScreen() {
  const [loading, setLoading] = useState(false)
  const [notificationList, setNotificationList] = useState<Notification[]>([])

  useEffect(() => {
    dispatch(onSetLastSeenNotification(new Date().getTime()))
  }, [])

  const onLoadNotificationsSuccess = (result: { notifications: Notification[] }) => {
    const newNotifications = [...notificationList, ...result.notifications]
    setNotificationList(newNotifications)
    setLoading(false)
  }

  useEffect(() => {
    let unsubscribe: Unsubscribe
    ;(async () => {
      setLoading(true)
      const result = await notificationService.getList({
        onNext: onLoadNotificationsSuccess
      })
      if (result) unsubscribe = result
    })()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const renderFooter = useMemo(
    () => (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText} appearance={'hint'}>
          No notifications yet
        </Text>
      </View>
    ),
    []
  )
  const keyExtractor = useCallback(data => `${data.id}`, [])
  const renderItem = useCallback(
    ({ item }: { item: Notification }) => <NotificationCard notification={item} />,
    []
  )

  return (
    <SafeAreaView style={styles.rootContainer}>
      <NavigationBar showLeftIcon={false} title="Notifications" />
      {loading ? (
        <View style={styles.emptyContainer}>
          <Spinner />
        </View>
      ) : (
        <FlatList
          data={notificationList}
          style={styles.listContainer}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={true}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      {/* <Text style={styles.notiTitle}>New</Text>
        <Text style={styles.notiTitle}>Earlier</Text> */}
    </SafeAreaView>
  )
}
