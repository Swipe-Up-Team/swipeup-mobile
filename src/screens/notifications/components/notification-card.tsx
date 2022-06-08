import { NOTIFICATION_TYPES } from '@src/constants'
import { ExtraNotification } from '@src/models/notification'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    padding: 15
  },
  fromPreviewWrapper: {
    height: 50,
    width: 50
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 38,
    borderColor: '#fff',
    borderWidth: 2
  },
  contentWrapper: {
    paddingHorizontal: 10
  }
})

export function NotificationCard({ notification }: { notification: ExtraNotification }) {
  const froms = [...(notification.froms || [])]
  let content = ''

  switch (notification.type) {
    case NOTIFICATION_TYPES.LIKE_MY_COMMENT:
      content = 'liked your comment.'
      break
    case NOTIFICATION_TYPES.LIKE_MY_POST:
      content = 'liked your photo.'
      break
    case NOTIFICATION_TYPES.COMMENT_MY_POST:
      content = `commented: ${notification.commentInfo?.text}`
      break
    case NOTIFICATION_TYPES.FOLLOW_ME:
      content = `started following you.`
      break
    case NOTIFICATION_TYPES.LIKE_MY_REPLY:
      content = `like your comment.`
      break
    case NOTIFICATION_TYPES.REPLY_MY_COMMENT:
      content = `commented: ${notification.replyInfo?.text}`
      break
    case NOTIFICATION_TYPES.SOMEONE_POSTS:
      content = `${notification.postInfo?.creator.name} posted new photo.`
      break
    case NOTIFICATION_TYPES.SOMEONE_LIKE_SOMEONE_POST:
      content = `liked your following post.`
      break
    case NOTIFICATION_TYPES.SOMEONE_COMMENT_SOMEONE_POST:
      content = `commented: ${notification.commentInfo?.text}`
      break
  }

  const handleViewNotificationPress = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.LIKE_MY_COMMENT:
        if (notification.postId) {
          navigate(APP_SCREEN.POST_DETAILS, {
            postId: notification.postId
          })
        }
        break
      case NOTIFICATION_TYPES.LIKE_MY_POST:
        // navigate('PostDetail', {
        //   postId: notification.postId
        // })
        break
      case NOTIFICATION_TYPES.COMMENT_MY_POST:
        // navigate('Comment', {
        //   postId: notification.postId,
        //   showFullPost: true,
        //   postData: notification.postInfo
        // })
        break
      case NOTIFICATION_TYPES.FOLLOW_ME:
        // navigate('ActiviyFollow', { type: 1 })
        break
      case NOTIFICATION_TYPES.LIKE_MY_REPLY:
        // navigate('Comment', {
        //   postId: notification.postId,
        //   postData: notification.postInfo
        // })
        break
      case NOTIFICATION_TYPES.REPLY_MY_COMMENT:
        // navigate('Comment', {
        //   postId: notification.postId
        // })
        break
      case NOTIFICATION_TYPES.SOMEONE_POSTS:
        // navigate('PostDetail', {
        //   postId: notification.postId,
        //   postData: notification.postInfo
        // })
        break
      case NOTIFICATION_TYPES.SOMEONE_LIKE_SOMEONE_POST:
        // navigate('PostDetail', {
        //   postId: notification.postId
        // })
        break
      case NOTIFICATION_TYPES.SOMEONE_COMMENT_SOMEONE_POST:
        // navigate('Comment', {
        //   postId: notification.postId,
        //   showFullPost: true,
        //   postData: notification.postInfo
        // })
        break
    }
  }

  return (
    <TouchableOpacity onPress={handleViewNotificationPress} style={styles.rootContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={styles.fromPreviewWrapper}>
          {notification.previewFroms && (
            <>
              {notification.previewFroms.length > 1 && (
                <>
                  <Image
                    style={styles.avatar}
                    source={{ uri: notification.previewFroms[1].avatar || '' }}
                  />
                  <Image
                    style={{
                      ...styles.avatar,
                      transform: [
                        {
                          translateX: 10
                        },
                        {
                          translateY: -30
                        }
                      ]
                    }}
                    source={{ uri: notification.previewFroms[0].avatar || '' }}
                  />
                </>
              )}
              {notification.previewFroms.length === 1 && (
                <>
                  <Image
                    style={{
                      ...styles.avatar,
                      height: 50,
                      width: 50
                    }}
                    source={{ uri: notification.previewFroms[0].avatar || '' }}
                  />
                </>
              )}
            </>
          )}
        </View>
        <View
          style={{
            ...styles.contentWrapper,
            width: Dimensions.get('screen').width - 50 - 30 - (notification.postInfo ? 50 : 0)
          }}
        >
          <Text numberOfLines={3}>
            <Text
              style={{
                fontWeight: '600'
              }}
            >
              {froms.splice(0, 2).join(', ')}{' '}
            </Text>
            {froms.length > 0 && (
              <Text>
                {' '}
                and {froms.length} {froms.length > 1 ? 'others' : 'other'}{' '}
              </Text>
            )}
            <Text>{content} </Text>
            {notification.createdAt && (
              <Text
                style={{
                  color: '#666'
                }}
              >
                {notification.createdAt}
              </Text>
            )}
          </Text>
        </View>
      </View>
      {notification.postInfo && notification.postInfo.content.images && (
        <TouchableOpacity
          onPress={() =>
            notification.postId &&
            navigate(APP_SCREEN.POST_DETAILS, {
              postId: notification.postId
            })
          }
          style={{
            borderColor: '#ddd',
            borderWidth: 0.3
          }}
        >
          <Image
            source={{
              uri: notification.postInfo.content.images[0]
            }}
            style={{
              width: 50,
              height: 50
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}
