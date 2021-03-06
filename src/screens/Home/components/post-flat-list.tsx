import { View, StyleSheet, FlatList } from 'react-native'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { AddPostCard, PostCard, StyledDivider } from '@src/components'
import { Post } from '@src/models'
import { Spinner, Text } from '@ui-kitten/components'
import isEqual from 'react-fast-compare'

const styles = StyleSheet.create({
  posts: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 15
  },
  spinnerContainer: { height: 40, width: '100%', alignItems: 'center' },
  footerContainer: {
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontWeight: '400'
  }
})

export interface PostFlatListComponentProps {
  posts: Post[]
  hasMoreToLoad: boolean
  navigation: any
  onLoadMore: () => void
  onRefresh: () => void
}
const PostFlatListComponent = ({
  posts,
  hasMoreToLoad,
  navigation,
  onLoadMore,
  onRefresh
}: PostFlatListComponentProps) => {
  const [refreshing, setRefreshing] = useState(false)
  const renderItem = useCallback(
    ({ item }: { item: Post }) => <PostCard post={item} navigation={navigation} />,
    [navigation]
  )
  const keyExtractor = useCallback(data => `${data.id}`, [])

  const renderFooter = useMemo(() => {
    if (!hasMoreToLoad)
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText} appearance={'hint'}>
            No posts yet
          </Text>
        </View>
      )

    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    )
  }, [hasMoreToLoad])

  const handleRefresh = async () => {
    setRefreshing(true)
    await onRefresh()
    setRefreshing(false)
  }

  const handleLoadMore = async () => {
    if (refreshing) return

    onLoadMore()
  }
  return (
    <FlatList
      data={posts}
      showsVerticalScrollIndicator={false}
      style={styles.posts}
      // TODO:
      refreshing={refreshing}
      onRefresh={handleRefresh}
      // ListEmptyComponent={ListEmpty}
      keyExtractor={keyExtractor}
      // key="id"
      ItemSeparatorComponent={StyledDivider}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      renderItem={renderItem}
      ListHeaderComponent={<AddPostCard />}
      // try to optimize performance
      initialNumToRender={3}
      maxToRenderPerBatch={1}
      removeClippedSubviews
    />
  )
}

export const PostFlatList = memo(PostFlatListComponent, isEqual)
