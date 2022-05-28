import { reactionImages } from '@src/constants'
import { Reactions as ReactionsType, ReactionType } from '@src/models'
import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

const getReactionIcon = (reaction: ReactionType) => {
  switch (reaction) {
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
const calculateTotalReaction = (obj: ReactionsType) => {
  let total = 0
  for (const el in obj) {
    if (obj.hasOwnProperty(el)) {
      total += parseFloat(obj[el])
    }
  }
  return total
}

export const Reactions = ({ reactions }: { reactions: ReactionsType }) => {
  return (
    <View style={styles.row}>
      {Object.keys(reactions).map((reaction, i) => {
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
      {Object.keys(reactions).length != 0 && (
        <Text style={styles.reactionText}>{calculateTotalReaction(reactions)}</Text>
      )}
    </View>
  )
}
