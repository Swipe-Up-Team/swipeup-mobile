/* eslint-disable react-hooks/exhaustive-deps */
import { CommentCard, PostCard } from '@src/components'
import { CommentResponseData, Post } from '@src/models'
import React, { forwardRef, memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { FlatList } from 'react-native'
import styles from '../styles'
import { EmptyComment } from './empty-comment'

export interface CommentFlatListComponentProps {
  comments: CommentResponseData[]
  postDetails?: Post
  onLikeComment: (commentId: string, isLiked: boolean, sendNoti: boolean) => void
}

const CommentFlatListComponent = forwardRef(
  (
    { comments, onLikeComment, postDetails }: CommentFlatListComponentProps,
    ref: React.ForwardedRef<FlatList>
  ) => {
    const renderItem = useCallback(
      ({ item }: { item: CommentResponseData }) => (
        <CommentCard
          item={item}
          key={item.id}
          onLikeComment={onLikeComment}
          onSharePress={() => {}}
        />
      ),
      []
    )
    const keyExtractor = useCallback(data => `${data.createdAt}`, [])

    const ListEmptyComponent = useCallback(() => <EmptyComment />, [])

    return (
      <FlatList
        ref={ref}
        data={comments}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.commentsContentContainer}
        style={styles.commentListContainer}
        keyExtractor={keyExtractor}
        ListHeaderComponent={postDetails ? <PostCard post={postDetails} /> : null}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        onContentSizeChange={() => ref?.current && ref?.current.scrollToEnd()}
      />
    )
  }
)

export const CommentFlatList = memo(CommentFlatListComponent, isEqual)
