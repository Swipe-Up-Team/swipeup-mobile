import { getState } from '@src/common'
import { firestore } from '@src/config'
import { FIRESTORE_ENDPOINT, NotificationTypes } from '@src/constants'
import { Notification, NotificationPayload } from '@src/models'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { Platform } from 'react-native'
import Toast from 'react-native-toast-message'

export const notificationService = {
  registerForPushNotifications: async () => {
    let token
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        Toast.show({ type: 'error', text1: 'Failed to get push token for push notification!' })
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
      Toast.show({ type: 'error', text1: 'Must use physical device for Push Notifications' })
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    return token
  },
  sendPushNotification: async (noti: Omit<Notification, 'id'>) => {
    const payload = await notificationService.generateNotificationPayload(noti)

    try {
      const result = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      return result
    } catch (error) {
      console.log(error)
    }
  },
  saveNotificationToFirestore: async (notification: Omit<Notification, 'id'>) => {
    const notificationsRef = collection(firestore, FIRESTORE_ENDPOINT.NOTIFICATIONS)
    const result = await addDoc(notificationsRef, notification)
    return result
  },
  saveExpoPushTokenToFirestore: async (token: string) => {
    const { user } = getState('user')
    if (!user) return

    try {
      const newToken = {
        token,
        createdAt: new Date().getTime(),
        deviceType: Platform.OS
      }

      // TODO: handle remove old token has the same device type | change to addDoc if has multiple devices
      const result = await setDoc(
        doc(firestore, FIRESTORE_ENDPOINT.EXPO_PUSH_TOKEN, user.id),
        newToken
      )
      return result
    } catch (error) {
      console.log(error)
    }
  },
  getSourceExpoToken: async (userId?: string) => {
    const result = await getDoc(doc(firestore, FIRESTORE_ENDPOINT.EXPO_PUSH_TOKEN, userId || ''))
    const token = result.data()?.token

    return token
  },
  getList: async ({ onNext }: { onNext?: (result: any) => void }) => {
    const { user } = getState('user')

    const notiRef = collection(firestore, FIRESTORE_ENDPOINT.NOTIFICATIONS)
    const queryRef = query(notiRef, where('userId', '==', user?.id), orderBy('createdAt', 'desc'))

    return onSnapshot(queryRef, async docSnapshot => {
      const promises = docSnapshot.docs.map(async _doc => {
        const parentType = _doc.data().parentType

        switch (parentType) {
          case 'post':
            const post = await getDoc(
              doc(firestore, FIRESTORE_ENDPOINT.USERS, _doc.data().parentId)
            )
            return {
              ..._doc.data(),
              id: _doc.id,
              postInfo: post
            }

          default:
            return {
              ..._doc.data(),
              id: _doc.id
            }
        }
      })

      const result = await Promise.all(promises)
      if (onNext) onNext({ notifications: result })
      return {
        notifications: result
      }
    })
  },
  generateNotificationPayload: async <K extends keyof AuthorizeParamsList>(
    notification: Omit<Notification, 'id'>
  ) => {
    const { user } = getState('user')
    if (!user) return ''

    let body = ''
    let route
    let params
    switch (notification.activityType) {
      case NotificationTypes.SomeoneReactYourPost:
        body = `${user.name || 'Someone'} react to your post.`
        route = APP_SCREEN.POST_DETAILS
        params = {
          postId: notification.sourceId
        }
        break
      case NotificationTypes.SomeoneReactYourComment:
        body = `${user.name || 'Someone'} react to your comment.`
        route = APP_SCREEN.POST_DETAILS
        params = {
          postId: notification.sourceId
        }
        break
      case NotificationTypes.SomeoneCommentToYourPost:
        body = `${user.name || 'Someone'} commented to your post.`
        route = APP_SCREEN.POST_DETAILS
        params = {
          postId: notification.sourceId
        }
        break
      case NotificationTypes.SomeoneReplyYourComment:
        body = `${user.name || 'Someone'} replied to your comment.`
        route = APP_SCREEN.POST_DETAILS
        params = {
          postId: notification.sourceId
        }
        break
      // case NotificationTypes.SomeoneAcceptYourFollowRequest:
      //   body = `${user.name || 'Someone'} accepted your follow request.`
      //   break
      case NotificationTypes.SomeoneFollowYou:
        body = `${user.name || 'Someone'} followed you.`
        route = APP_SCREEN.FOLLOWING
        params = {
          userId: notification.userId
        }
        break
      // TODO: handle call request to get more data
      // case NotificationTypes.SomeoneCommentPostSomeoneToo:
      //   body =  `${user.name || 'Someone'} also commented on abc's post.`
      // case NotificationTypes.SomeoneTagYouOnPostOfSomeone:
      //   body =  `${user.name || 'Someone'} mentioned you to abc's post.`

      default:
        break
    }

    const receiverToken = await notificationService.getSourceExpoToken(notification.userId)

    if (!route) {
      const payload: NotificationPayload<K> = {
        to: receiverToken,
        sound: 'default',
        title: 'New noti from SwipeUp🎉',
        body,
        data: {}
      }
      return payload
    }

    const payload: NotificationPayload<K> = {
      to: receiverToken,
      sound: 'default',
      title: 'New noti from SwipeUp🎉',
      body,
      data: {
        navigation: {
          route,
          params
        }
      }
    }
    return payload
  },
  changeNotiSeenMode: async (id: string, seen: number) => {
    const docRef = doc(firestore, FIRESTORE_ENDPOINT.NOTIFICATIONS, id)

    await updateDoc(docRef, { seen })
  }
}
