import { reactionImages } from '@src/constants'
import { Reaction } from '@src/models'
import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles'

const getReactionIcon = (reaction: Reaction) => {
  switch (reaction.type) {
    case 'like':
      return reactionImages.like_static_fill
    case 'love':
      return reactionImages.love_static
    case 'haha':
      return reactionImages.haha_static
    case 'wow':
      return reactionImages.wow_static
    case 'sad':
      return reactionImages.sad_static
    case 'angry':
      return reactionImages.angry_static
    default:
      return reactionImages.like_static_fill
  }
}

export const ReactionsCounter = ({ reactions }: { reactions: Reaction[] }) => {
  return (
    <View style={styles.row}>
      {reactions.map((reaction, i) => {
        if (i < 3)
          //we only need to show maximum of 3 reaction icons.
          return (
            <View
              key={i}
              style={[
                styles.reactionIconContainer,
                { zIndex: i * -1, transform: [{ translateX: i * -2 }] }
              ]}
            >
              <Image source={getReactionIcon(reaction)} style={styles.reactionIcon} />
            </View>
          )
      })}
      {reactions.length !== 0 && <Text style={styles.reactionText}>{reactions.length}</Text>}
    </View>
  )
}
