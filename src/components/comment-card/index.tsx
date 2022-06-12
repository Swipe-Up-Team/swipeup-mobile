import { Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { View } from 'react-native'

import { CommentResponseData } from '@src/models'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import { UserAvatarSquare } from '../user-avatar-square'
import { formatDistanceToNow } from 'date-fns'
import { getState } from '@src/common'
import { LikeButton } from '../like-button'
import debounce from 'lodash/debounce'

export const CommentCard = ({
  item,
  onLikeComment
}: {
  item: CommentResponseData
  onSharePress: () => void
  onLikeComment: (commentId: string, isLiked: boolean) => void
}) => {
  const { author, createdAt, text } = item
  const { user } = getState('user')

  const [isLiked, setIsLiked] = useState(() => {
    let liked = false
    item.reacts.forEach(react => {
      if (react.userId === user?.id) liked = true
    })
    return liked
  })

  const debouncedLikePost = useRef(debounce(onLikeComment, 300)).current

  const handleLikeCommentPress = async (commentId: string, _isLiked: boolean) => {
    debouncedLikePost(commentId, _isLiked)
  }

  const handleLikePress = async () => {
    const newLikes = !isLiked
    setIsLiked(newLikes)
    handleLikeCommentPress(item.id, newLikes)
  }

  return (
    <View style={styles.commentContainer}>
      <View style={styles.row}>
        {author.avatar && <UserAvatarSquare uri={author.avatar} />}
        <View style={styles.userInfo}>
          <Text style={styles.creatorName}>{author.name}</Text>
          <Text numberOfLines={1} appearance="hint" style={styles.createdAt}>
            {createdAt && formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Text>
        </View>
      </View>
      <View style={styles.commentSection}>
        <Text style={styles.comment}>{text}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.row, styles.actionContainer]} onPress={handleLikePress}>
            <LikeButton isLiked={isLiked} />
            <Text style={[styles.lightText, { marginLeft: -5 }]}> Like</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={onSharePress} style={[styles.row, styles.actionContainer]}>
            <CommentReplyIcon />
            <Text style={styles.lightText}> 6</Text>
            <Text style={styles.lightText}> Replies</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}
