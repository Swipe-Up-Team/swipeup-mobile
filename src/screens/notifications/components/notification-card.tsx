import { UserAvatarSquare } from '@src/components'
import { NotificationSeenType, NotificationTypes } from '@src/constants'
import { User } from '@src/models'
import { Notification } from '@src/models/notification'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { notificationService, userService } from '@src/services'
import { Text } from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  notSeen: {
    backgroundColor: '#f7f7f7'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  fromPreviewWrapper: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 38,
    borderColor: '#fff',
    borderWidth: 2
  },
  contentWrapper: {
    paddingHorizontal: 15
  }
})

export function NotificationCard({ notification }: { notification: Notification }) {
  const [preview, setPreview] = useState<User>()
  const [loading, setLoading] = useState(true)

  let content = ''

  switch (notification.activityType) {
    case NotificationTypes.SomeoneReplyYourComment:
      content = 'replied your comment.'
      break
    case NotificationTypes.SomeoneReactYourPost:
      content = 'reacted your post.'
      break
    case NotificationTypes.SomeoneCommentToYourPost:
      content = `commented on your post`
      break
    case NotificationTypes.SomeoneFollowYou:
      content = `started following you.`
      break
    case NotificationTypes.SomeoneReactYourComment:
      content = `like your comment.`
      break
    default:
      content = ''
      break
  }

  const handleViewNotificationPress = () => {
    notificationService.changeNotiSeenMode(notification.id, NotificationSeenType.Yes)

    switch (notification.activityType) {
      case NotificationTypes.SomeoneReactYourComment:
        if (notification.sourceId) {
          navigate(APP_SCREEN.POST_DETAILS, {
            postId: notification.sourceId
          })
        }
        break
      case NotificationTypes.SomeoneReactYourPost:
        if (notification.sourceId) {
          navigate(APP_SCREEN.POST_DETAILS, {
            postId: notification.sourceId
          })
        }
        break
      case NotificationTypes.SomeoneCommentToYourPost:
        if (notification.sourceId) {
          navigate(APP_SCREEN.POST_DETAILS, {
            postId: notification.sourceId
          })
        }
        break
      case NotificationTypes.SomeoneFollowYou:
        navigate(APP_SCREEN.FOLLOWING, { userId: notification.sourceId })
        break
      case NotificationTypes.SomeoneTagYouOnPostOfSomeone:
        if (notification.sourceId) {
          navigate(APP_SCREEN.POST_DETAILS, {
            postId: notification.sourceId
          })
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let previewObj: User
      switch (notification.activityType) {
        case NotificationTypes.SomeoneReactYourPost:
          previewObj = (await userService.getUser(notification.parentId)) as User
          if (previewObj) {
            setPreview(previewObj)
          }
          break
        case NotificationTypes.SomeoneReactYourComment:
          previewObj = (await userService.getUser(notification.userId)) as User
          if (previewObj) {
            setPreview(previewObj)
          }
          break
        case NotificationTypes.SomeoneCommentToYourPost:
          previewObj = (await userService.getUser(notification.parentId)) as User
          if (previewObj) {
            setPreview(previewObj)
          }
          break

        default:
          break
      }

      setLoading(false)
    })()
  }, [notification])

  return (
    <TouchableOpacity
      onPress={handleViewNotificationPress}
      style={[
        styles.rootContainer,
        notification.seen === NotificationSeenType.No ? styles.notSeen : null
      ]}
    >
      <View style={styles.row}>
        <View style={styles.fromPreviewWrapper}>
          {preview?.avatar && <UserAvatarSquare uri={preview?.avatar} />}
        </View>

        <View
          style={{
            ...styles.contentWrapper,
            width: Dimensions.get('screen').width - 50 - 30
          }}
        >
          <Text numberOfLines={3}>
            <Text category="s1">{`${preview?.name} `}</Text>
            <Text>{content} </Text>
          </Text>
          {notification.createdAt && (
            <Text appearance="hint" category="c1">
              {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}
