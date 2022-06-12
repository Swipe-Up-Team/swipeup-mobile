import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { BOTTOM_TAB_BAR_HEIGHT } from '@src/constants'
import { AddPostCard, PostCard, StyledDivider } from '@src/components'
import { Post } from '@src/models'
import { Spinner } from '@ui-kitten/components'
import isEqual from 'react-fast-compare'

const styles = StyleSheet.create({
  posts: {
    flex: 1,
    marginBottom: BOTTOM_TAB_BAR_HEIGHT + 50
  },
  spinnerContainer: { height: 40, width: '100%', alignItems: 'center' }
})
export interface PostFlatListComponentProps {
  posts: Post[]
  hasMoreToLoad: boolean
  onLoadMore: () => void
}
const PostFlatListComponent = ({
  posts,
  hasMoreToLoad,
  onLoadMore
}: PostFlatListComponentProps) => {
  const renderItem = useCallback(({ item }: { item: Post }) => <PostCard post={item} />, [])
  const keyExtractor = useCallback(data => `${data.id}`, [])

  const renderFooter = useMemo(() => {
    if (!hasMoreToLoad) return <Text>Nothing to load</Text>

    // if (!loading) return null

    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    )
  }, [hasMoreToLoad])
  console.log('rerender post flatlist')
  return (
    <FlatList
      data={posts}
      showsVerticalScrollIndicator={false}
      style={styles.posts}
      // TODO:
      // onRefresh
      // ListEmptyComponent={ListEmpty}
      keyExtractor={keyExtractor}
      // key="id"
      ItemSeparatorComponent={StyledDivider}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.5}
      onEndReached={onLoadMore}
      renderItem={renderItem}
      ListHeaderComponent={<AddPostCard />}
      // try to optimize performance
      // removeClippedSubviews={true}
      initialNumToRender={5}
      maxToRenderPerBatch={1}
      updateCellsBatchingPeriod={100}
      windowSize={10}
    />
  )
}
export const PostFlatList = memo(PostFlatListComponent, isEqual)
