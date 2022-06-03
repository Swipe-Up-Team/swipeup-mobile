import { Avatar, Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

import { Comment } from '@src/models'
import styles from './styles'
import { CommentReplyIcon, HeartIcon } from '../icons'
import { TouchableOpacity } from 'react-native'

export const CommentCard = ({
  item,
  onSharePress
}: {
  item: Comment
  onSharePress: () => void
}) => {
  const { authorId, images, createdAt, text, reacts } = item
  return (
    <View style={styles.commentContainer}>
      <View style={styles.row}>
        {images && (
          <Avatar style={styles.imageContainer} shape="square" source={{ uri: images[0] }} />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.creatorName}>{authorId}</Text>
          <Text numberOfLines={1} appearance="hint" style={styles.createdAt}>
            {createdAt}
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
