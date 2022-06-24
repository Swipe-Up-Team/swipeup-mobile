/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native'
import { getState } from '@src/common'
import { NotificationParentTypes, NotificationSeenType, NotificationTypes } from '@src/constants'
import { Notification, Post, Post as PostType } from '@src/models'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { notificationService, postService } from '@src/services'
import { countReaction } from '@src/utils'
import { Text } from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'
import debounce from 'lodash/debounce'
import React, { memo, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import { DotsHorizontal, ExportIcon, PostCommentIcon } from '../icons'
import { ImageGrid } from '../image-grid'
import { LikeButton } from '../like-button'
import { UserAvatarSquare } from '../user-avatar-square'
import { PostDescription, PostDescriptionType } from './post-description'
import styles from './styles'
import { PostVideo } from '../video-player/post-video'

export interface PostCardProps {
  post: PostType
  shared?: boolean
  preview?: boolean
  navigation?: any
}

const PostCardComponent = ({
  post,
  shared = false,
  preview = false,
  navigation
}: PostCardProps) => {
  const {
    comments,
    content: { text, images, video, sharedPostId },
    reacts
  } = post

  const { user } = getState('user')
  const descRef = useRef<PostDescriptionType>(null)
  const route = useRoute()
  const showOptionsBtn = route.name !== APP_SCREEN.SHARE_POST

  const [isLiked, setIsLiked] = useState(() => {
    let liked = false
    reacts?.forEach(react => {
      if (react.userId === user?.id) liked = true
    })
    return liked
  })
  const [totalReaction, setTotalReaction] = useState(countReaction(reacts || [], 'like'))
  const [sharedPost, setSharedPost] = useState<Post>()

  useEffect(() => {
    if (sharedPostId) {
      ;(async () => {
        const result = await postService.getSinglePostById(sharedPostId)
        setSharedPost(result)
      })()
    }
  }, [])

  const saveNoti = async () => {
    if (!user || user.id === post.authorId) return

    const noti: Omit<Notification, 'id'> = {
      userId: post.authorId!,
      activityType: NotificationTypes.SomeoneReactYourPost,
      sourceId: post.id,
      parentId: user.id,
      parentType: NotificationParentTypes.Post,
      seen: NotificationSeenType.No,
      createdAt: new Date().getTime()
    }
    await notificationService.saveNotificationToFirestore(noti)
    await notificationService.sendPushNotification(noti)
  }

  const handleUpdateLikeOfPost = async (_isLiked: boolean) => {
    if (!user) return

    await postService.likePost(post.id, _isLiked)
    if (_isLiked) saveNoti()
  }
  const debouncedLikePost = useRef(debounce(handleUpdateLikeOfPost, 500)).current

  const handleLikePress = async () => {
    const _isLiked = !isLiked
    setIsLiked(_isLiked)
    setTotalReaction(_isLiked ? totalReaction + 1 : totalReaction - 1)
    debouncedLikePost(_isLiked)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressImage = (image: string, index: number, e: GestureResponderEvent) =>
    preview
      ? navigate(APP_SCREEN.FEED_IMAGE_PREVIEW, { images: images || [] }) //To preview a selected single image
      : navigate(APP_SCREEN.POST_DETAILS, { postId: post.id }) //index is passed to scroll to the specific image on mount

  const handleCommentPress = () => {
    if (route.name === APP_SCREEN.POST_DETAILS) return

    navigate(APP_SCREEN.POST_DETAILS, { postId: post.id })
  }

  const handleSharePress = () => {
    navigate(APP_SCREEN.SHARE_POST, {
      post
    })
  }

  const handleOptionsPress = () => {
    navigate(APP_SCREEN.POST_OPTIONS_MODAL, {
      post
    })
  }

  const handleProfilePress = () => {
    if (post.creator.id === user?.id) {
      navigate(APP_SCREEN.PROFILE, { userId: post.creator.id })
    } else {
      navigation.push(APP_SCREEN.PROFILE, { userId: post.creator.id })
    }
  }

  const renderCommentText = () => {
    if (!comments) return 'Comment'
    if (comments > 1) return `${comments} Comments`
    return '1 Comment'
  }

  return (
    <View style={[styles.post, shared ? { paddingTop: 0 } : null]}>
      {post.creator ? (
        <View style={[styles.header, styles.row]}>
          <TouchableOpacity onPress={handleProfilePress} style={styles.row}>
            <UserAvatarSquare uri={post.creator.avatar} />
            <View style={{ marginHorizontal: 10 }}>
              <View style={styles.row}>
                <Text numberOfLines={1} style={styles.creatorName}>
                  {post.creator.name}
                </Text>
              </View>
              <View style={styles.row}>
                <Text numberOfLines={1} appearance="hint" style={styles.createdAt}>
                  {post.createdAt &&
                    formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {showOptionsBtn && (
            <TouchableOpacity onPress={handleOptionsPress} style={styles.dots}>
              <DotsHorizontal width={28} height={28} />
            </TouchableOpacity>
          )}
        </View>
      ) : null}

      {text ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => descRef.current && descRef.current.toggleNumberOfLines()}
          style={styles.descriptionContainer}
        >
          <PostDescription
            ref={descRef}
            desc={text}
            showFull={route.name === APP_SCREEN.POST_DETAILS}
          />
        </TouchableOpacity>
      ) : null}

      {!!sharedPostId && sharedPost && (
        <View style={styles.sharedPostContainer}>
          <PostCard post={sharedPost} shared />
        </View>
      )}

      {!sharedPostId && images && images.length > 0 && (
        <View style={{ height: 300 }}>
          <ImageGrid
            style={{ height: 300, paddingBottom: 10 }}
            images={images}
            onPress={onPressImage}
          />
        </View>
      )}

      {!sharedPostId && video && <PostVideo video={video} />}

      {!shared && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.buttonContainer, { marginLeft: -10 }]}
            onPress={handleLikePress}
          >
            <LikeButton isLiked={isLiked} />
            <Text style={[styles.buttonText, { marginLeft: -5 }]}>
              {totalReaction > 0 ? totalReaction : ''} {totalReaction > 1 ? 'Likes' : 'Like'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={handleCommentPress}
          >
            <PostCommentIcon />
            <Text style={styles.buttonText}>{renderCommentText()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={handleSharePress}
          >
            <ExportIcon />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export const PostCard = memo(PostCardComponent, isEqual)
