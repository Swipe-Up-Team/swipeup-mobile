/* eslint-disable react-hooks/exhaustive-deps */
// import { hideLoading, PortalHost, ProgressDialog, showLoading } from '@components'
// import { ImageTransition } from '@library/components/light-box/image-transition';
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as Notifications from 'expo-notifications'
import { Subscription } from 'expo-media-library'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'react-native'

import { navigationRef } from './navigation-service'
import { RootNavigation } from './root-navigator'
import { onLoadApp, onLoadAppEnd } from '@src/store/reducers/app-reducer'
import { MyAppTheme } from '@src/themes'
import { useNetWorkStatus, useSelector } from '@src/common/hooks'
import { dispatch, RXStore } from '@src/common/redux'
import { hideLoading, ProgressDialog, showLoading } from '@src/components/progress-dialog'
import { notificationService } from '@src/services'
import { onSetExpoPushToken } from '@src/store/reducers/notification-reducer'
import { ImageTransition } from '@src/components/light-box/image-transition'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})
export const AppContainer = () => {
  // state
  const { token, loadingApp, showDialog, theme } = useSelector(x => x.app)
  const { user } = useSelector(x => x.user)
  const [canAccess] = useNetWorkStatus()
  const [firstAccess, setFirstAccess] = useState(true)

  // effect
  useEffect(() => {
    dispatch(onLoadApp())
    ;(async () => {
      console.log('user', user)
      dispatch(onLoadAppEnd())
    })()
  }, [user])

  useEffect(() => {
    console.log({ token })
  }, [token])

  useEffect(() => {
    if (showDialog) {
      showLoading()
    } else {
      hideLoading()
    }
  }, [showDialog])

  useEffect(() => {
    if (firstAccess && !canAccess) {
      return
    }

    if (firstAccess) {
      setFirstAccess(false)
      return
    }

    if (canAccess && !firstAccess) {
      Toast.show({
        type: 'success',
        text1: 'Your internet connection was restored.'
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'You are currently offline.'
      })
    }
  }, [canAccess])

  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    notificationService.registerForPushNotifications().then(_token => {
      if (token) {
        notificationService.saveExpoPushTokenToFirestore(_token)
        dispatch(onSetExpoPushToken(_token))
      }
    })

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(_notification => {
      console.log(
        '🚀 ~ file: app-navigation.tsx ~ line 72 ~ useEffect ~ notification',
        _notification
      )
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('🚀 ~ file: app-navigation.tsx ~ line 100 ~ useEffect ~ response', response)
    })

    return () => {
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(notificationListener.current)
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} barStyle="dark-content" />
        {!loadingApp && (
          <>
            {/* <PortalHost name={'AppModal'} /> */}
            <RootNavigation token={token} />
            <ProgressDialog />
            <Toast position="bottom" bottomOffset={80} />
            <ImageTransition />
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  )
}
