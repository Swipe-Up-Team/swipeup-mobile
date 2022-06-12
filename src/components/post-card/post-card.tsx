/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native'
import { Post as PostType, Reaction } from '@src/models'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { Text } from '@ui-kitten/components'
import React, { memo, useCallback, useRef, useState } from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import { DotsHorizontal, ExportIcon, PostCommentIcon } from '../icons'
import { ImageGrid } from '../image-grid'
import { PostDescription, PostDescriptionType } from './post-description'
import styles from './styles'
import { formatDistanceToNow } from 'date-fns'
import { UserAvatarSquare } from '../user-avatar-square'
import isEqual from 'react-fast-compare'
import { LikeButton } from '../like-button'
import { getState } from '@src/common'
import debounce from 'lodash/debounce'
import { postService } from '@src/services'

export interface PostCardProps {
  post: PostType
  preview?: boolean
}

const PostCardComponent = ({ post, preview = false }: PostCardProps) => {
  const {
    comments,
    content: { text, images },
    reacts
  } = post

  const { user } = getState('user')
  const descRef = useRef<PostDescriptionType>(null)
  const route = useRoute()

  const [isLiked, setIsLiked] = useState(() => {
    let liked = false
    reacts?.forEach(react => {
      if (react.userId === user?.id) liked = true
    })
    return liked
  })

  const handleUpdateLikeOfPost = async (_isLiked: boolean) => {
    if (!user) return
    if (_isLiked === isLiked) return

    await postService.likePost(post.id, _isLiked)
  }
  const debouncedLikePost = useRef(debounce(handleUpdateLikeOfPost, 300)).current

  const handleLikePress = async () => {
    const _isLiked = !isLiked
    setIsLiked(_isLiked)
    debouncedLikePost(_isLiked)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressImage = (image: string, index: number, e: GestureResponderEvent) =>
    preview
      ? navigate(APP_SCREEN.FEED_IMAGE_PREVIEW, { images: images || [] }) //To preview a selected single image
      : navigate(APP_SCREEN.POST_DETAILS, { postId: post.id }) //index is passed to scroll to the specific image on mount

  const handleCommentPress = () => {
    navigate(APP_SCREEN.POST_DETAILS, { postId: post.id })
  }

  const handleSharePress = () => {
    alert('Share')
  }

  const onPressPost = () => {
    navigate(APP_SCREEN.PROFILE, { userId: post.creator.id })
  }

  return (
    <View style={styles.post}>
      {post.creator ? (
        <View style={[styles.header, styles.row]}>
          <TouchableOpacity onPress={onPressPost} style={styles.row}>
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

          <TouchableOpacity onPress={() => alert('Options')} style={styles.dots}>
            <DotsHorizontal width={28} height={28} />
          </TouchableOpacity>
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
            showFull={route.name === 'FacebookFeedPostDetails'}
          />
        </TouchableOpacity>
      ) : null}

      {images && images.length > 0 && (
        <View style={{ height: 270 }}>
          <ImageGrid
            style={{ height: 270, paddingHorizontal: 15 }}
            images={images}
            onPress={onPressImage}
          />
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.buttonContainer, { marginLeft: -10 }]}
          onPress={handleLikePress}
        >
          <LikeButton isLiked={isLiked} />
          <Text style={[styles.buttonText, { marginLeft: -5 }]}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonContainer}
          onPress={handleCommentPress}
        >
          <PostCommentIcon />
          <Text style={styles.buttonText}>{comments ? comments.length : ''} Comments</Text>
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
    </View>
  )
}

export const PostCard = memo(PostCardComponent, isEqual)
