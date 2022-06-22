/* eslint-disable react-native/no-inline-styles */
import { Text } from '@ui-kitten/components'
import React, { useRef, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { formatDistanceToNow } from 'date-fns'
import debounce from 'lodash/debounce'

import { getState } from '@src/common'
import { CommentResponseData } from '@src/models'
import { countReaction } from '@src/utils'
import { LikeButton } from '../like-button'
import { UserAvatarSquare } from '../user-avatar-square'
import styles from './styles'

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
  const [totalReaction, setTotalReaction] = useState(countReaction(item.reacts || [], 'like'))

  const debouncedLikePost = useRef(debounce(onLikeComment, 300)).current

  const handleLikeCommentPress = async (commentId: string, _isLiked: boolean) => {
    debouncedLikePost(commentId, _isLiked)
  }

  const handleLikePress = async () => {
    const newLikes = !isLiked
    setIsLiked(newLikes)
    setTotalReaction(newLikes ? totalReaction + 1 : totalReaction - 1)
    handleLikeCommentPress(item.id, newLikes)
  }

  return (
    <View style={styles.commentContainer}>
      <View style={styles.innerContainer}>
        <View>
          <UserAvatarSquare uri={author.avatar} />
        </View>

        <View style={styles.commentSection}>
          <View style={styles.userInfo}>
            <Text style={styles.creatorName}>{author.name}</Text>
            <Text numberOfLines={1} appearance="hint" style={styles.createdAt}>
              {createdAt && formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Text>
          </View>
          <Text style={styles.comment}>{text}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.row]} onPress={handleLikePress}>
          <LikeButton isLiked={isLiked} />
          <Text style={[styles.lightText, { marginLeft: -5 }]}>
            {totalReaction > 0 ? totalReaction : ''} {totalReaction > 1 ? 'Likes' : 'Like'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
