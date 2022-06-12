/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native'
import { Post as PostType } from '@src/models/post'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN } from '@src/navigation/screen-types'
import { Text } from '@ui-kitten/components'
import React, { memo, useRef } from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import { DotsHorizontal, ExportIcon, PostCommentIcon } from '../icons'
import { ImageGrid } from '../image-grid'
import { ReactionsButton } from '../reactions-button'
import { PostDescription, PostDescriptionType } from './post-description'
import styles from './styles'
import { formatDistanceToNow } from 'date-fns'
import { UserAvatarSquare } from '../user-avatar-square'
import isEqual from 'react-fast-compare'

export interface PostCardProps {
  post: PostType
  preview?: boolean
}

const PostCardComponent = ({ post, preview = false }: PostCardProps) => {
  const {
    comments,
    content: { text, images }
  } = post
  const descRef = useRef<PostDescriptionType>(null)
  const route = useRoute()
  console.log('render postcard')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressImage = (image: string, index: number, e: GestureResponderEvent) =>
    preview
      ? navigate(APP_SCREEN.FEED_IMAGE_PREVIEW, { images: images || [] }) //To preview a selected single image
      : navigate(APP_SCREEN.POST_DETAILS, { postId: post.id }) //index is passed to scroll to the specific image on mount

  const onPressComments = () => {
    navigate(APP_SCREEN.POST_DETAILS, { postId: post.id })
  }

  const onPressShare = () => {
    alert('Share')
  }

  const onPressPost = () => {
    navigate(APP_SCREEN.PROFILE, { userId: post.creator.id })
  }

  return (
    <View style={styles.post}>
      {post.creator ? (
        <View style={[styles.header, styles.row]}>
          <TouchableOpacity
            onPress={() => {
              onPressPost()
            }}
            style={styles.row}
          >
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
        <ReactionsButton />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonContainer}
          onPress={onPressComments}
        >
          <PostCommentIcon />
          <Text style={styles.buttonText}>{comments ? comments.length : ''} Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer} onPress={onPressShare}>
          <ExportIcon />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const PostCard = memo(PostCardComponent, isEqual)
