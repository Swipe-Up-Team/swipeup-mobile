import { CommentCard } from '@src/components'
import { CommentResponseData } from '@src/models'
import React, { forwardRef, memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { FlatList } from 'react-native'
import styles from '../styles'
import { EmptyComment } from './empty-comment'

export interface CommentFlatListComponentProps {
  comments: CommentResponseData[]
  hasMoreToLoad?: boolean
  onLoadMore?: () => void
}

const CommentFlatListComponent = forwardRef(
  ({ comments }: CommentFlatListComponentProps, ref: React.ForwardedRef<FlatList>) => {
    const renderItem = useCallback(
      ({ item }: { item: CommentResponseData }) => (
        <CommentCard item={item} key={item.id} onSharePress={() => {}} />
      ),
      []
    )
    const keyExtractor = useCallback(data => `${data.createdAt}`, [])

    const ListEmptyComponent = useCallback(() => <EmptyComment />, [])

    return (
      <FlatList
        ref={ref}
        // keyboardShouldPersistTaps={'always'}
        data={comments}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.commentsContentContainer}
        style={styles.commentListContainer}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        onContentSizeChange={() => ref?.current?.scrollToEnd()}
      />
    )
  }
)

export const CommentFlatList = memo(CommentFlatListComponent, isEqual)
