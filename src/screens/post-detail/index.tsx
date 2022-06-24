/* eslint-disable react-hooks/exhaustive-deps */
import { RouteProp, useRoute } from '@react-navigation/native'
import { getState } from '@src/common'
import { NavigationBar } from '@src/components'
import { CommentInput } from '@src/components/comment-input'
import { NotificationParentTypes, NotificationSeenType, NotificationTypes } from '@src/constants'
import { CommentPayload, CommentResponseData, Notification, Post } from '@src/models'
import { goBack } from '@src/navigation/navigation-service'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import { commentService, notificationService, postService } from '@src/services'
import { Spinner } from '@ui-kitten/components'
import { Unsubscribe } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CommentFlatList } from './components/comment-flat-list'
import styles from './styles'

export function PostDetailScreen() {
  const commentListRef = useRef<FlatList<CommentResponseData>>(null)

  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.POST_DETAILS>>()
  const [loading, setLoading] = useState(true)
  const [postDetails, setPostDetails] = useState<Post>()
  const [comments, setComments] = useState<CommentResponseData[]>([])
  const { user } = getState('user')

  // handle comment
  const saveNotiAddComment = async () => {
    if (!user || user.id === postDetails?.authorId) return

    const noti: Omit<Notification, 'id'> = {
      userId: postDetails?.authorId!,
      activityType: NotificationTypes.SomeoneCommentToYourPost,
      sourceId: route.params.postId,
      parentId: user.id,
      parentType: NotificationParentTypes.Post,
      seen: NotificationSeenType.No,
      createdAt: new Date().getTime()
    }
    await notificationService.saveNotificationToFirestore(noti)
    await notificationService.sendPushNotification(noti)
  }

  const handleAddComment = async (text: string) => {
    try {
      if (!route.params.postId) return
      if (!user) return

      const comment: CommentPayload = {
        text,
        authorId: user.id
      }
      const result = await commentService.addNew(route.params.postId, comment)
      console.log(result)
    } catch (error) {
      console.log(error)
    }

    saveNotiAddComment()
  }

  const saveNotiLikeComment = async (commentId: string) => {
    if (!user) return

    const noti: Omit<Notification, 'id'> = {
      userId: postDetails?.authorId!,
      activityType: NotificationTypes.SomeoneReactYourComment,
      sourceId: route.params.postId,
      parentId: commentId,
      parentType: NotificationParentTypes.Comment,
      seen: NotificationSeenType.No,
      createdAt: new Date().getTime()
    }
    await notificationService.saveNotificationToFirestore(noti)
    await notificationService.sendPushNotification(noti)
  }
  const handleLikeCommentPress = async (commentId: string, isLiked: boolean, sentNoti: boolean) => {
    await commentService.likeComment(route.params.postId, commentId, isLiked)
    if (sentNoti) saveNotiLikeComment(commentId)
  }

  // load comment list + post details
  const onLoadCommentsSuccess = (result: { comments: CommentResponseData[] }) => {
    const newComments = [...comments, ...result.comments]
    setComments(newComments)
  }

  useEffect(() => {
    let unsubscribe: Unsubscribe
    ;(async () => {
      if (!route.params.postId) return

      setLoading(true)
      const result = await commentService.getList(route.params.postId, {
        onNext: onLoadCommentsSuccess
      })
      if (result) unsubscribe = result

      const postResult = await postService.getSinglePostById(route.params.postId)
      if (postResult) setPostDetails(postResult)

      setLoading(false)
    })()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [route.params.postId])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title="Comments" callback={goBack} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {loading ? (
          <View style={styles.emptyContainer}>
            <Spinner />
          </View>
        ) : (
          <CommentFlatList
            ref={commentListRef}
            postDetails={postDetails}
            comments={comments}
            onLikeComment={handleLikeCommentPress}
          />
        )}
        <CommentInput onSubmit={handleAddComment} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
