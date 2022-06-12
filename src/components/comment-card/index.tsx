import { Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

import { CommentResponseData } from '@src/models'
import styles from './styles'
import { CommentReplyIcon, HeartIcon } from '../icons'
import { TouchableOpacity } from 'react-native'
import { UserAvatarSquare } from '../user-avatar-square'
import { formatDistanceToNow } from 'date-fns'

export const CommentCard = ({
  item,
  onSharePress
}: {
  item: CommentResponseData
  onSharePress: () => void
}) => {
  const { author, createdAt, text } = item
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
          {/* <ReactionsCounter reactions={reacts} /> */}
          <View style={[styles.row, styles.actionContainer]}>
            <HeartIcon />
            <Text style={styles.lightText}> 1.2K</Text>
            <Text style={styles.lightText}> Likes</Text>
          </View>
          <TouchableOpacity onPress={onSharePress} style={[styles.row, styles.actionContainer]}>
            <CommentReplyIcon />
            <Text style={styles.lightText}> 6</Text>
            <Text style={styles.lightText}> Replies</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
