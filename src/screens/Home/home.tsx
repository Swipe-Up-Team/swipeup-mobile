/* eslint-disable react-hooks/exhaustive-deps */
import { dispatch } from '@src/common'
import { AddPostCard, PostCard, StyledDivider } from '@src/components'
import { FirebasePagination, Post } from '@src/models'
import { postService } from '@src/services'
import { onSetToken } from '@src/store/reducers/app-reducer'
import { Spinner } from '@ui-kitten/components'
import { Unsubscribe } from 'firebase/firestore'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import isEqual from 'react-fast-compare'
import { PostFlatList } from './components/post-flat-list'

let { width: screenWidth } = Dimensions.get('window')

const HomeScreenComponent = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [pagination, setPagination] = useState<FirebasePagination>({
    page: 1,
    limit: 4
  })

  const onLoadPostsSuccess = (result: { posts: any; lastDoc: any; isLast: any }) => {
    setPosts([...posts, ...result.posts])
    setPagination({ ...pagination, startAfter: result.lastDoc })
    if (result.isLast) setHasMoreToLoad(false)
  }

  useEffect(() => {
    let unsubscribe: Unsubscribe
    ;(async () => {
      setLoading(true)
      const result = await postService.getList(pagination, {
        onNext: onLoadPostsSuccess
      })
      if (result) unsubscribe = result
      setLoading(false)
    })()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [pagination.page])

  const increasePagination = () => {
    setPagination({ ...pagination, page: pagination.page + 1 })
  }

  const handleLoadMore = async () => {
    if (!hasMoreToLoad) return

    // setPagination({ ...pagination, page: pagination.page + 1 })
    console.log('rerender handleLoadMore')
    increasePagination()
  }

  // const renderFooter = useMemo(() => {
  //   if (!hasMoreToLoad) return <Text>Nothing to load</Text>

  //   // if (!loading) return null

  //   return (
  //     <View style={styles.spinnerContainer}>
  //       <Spinner />
  //     </View>
  //   )
  // }, [hasMoreToLoad])

  // const renderItem = useCallback(({ item }: { item: Post }) => <PostCard post={item} />, [])
  // const keyExtractor = useCallback(data => `${data.id}`, [])

  // const dataProvider = useMemo(
  //   () =>
  //     new DataProvider((r1, r2) => {
  //       return !isEqual(r1, r2)
  //     }).cloneWithRows(posts),
  //   [posts]
  // )

  // const renderItemRecyclerListView = (type, data) => {
  //   return <PostCard post={data} />
  // }
  // const layoutProvider = new LayoutProvider(
  //   () => 0,
  //   (type, dim) => {
  //     dim.width = screenWidth
  //     dim.height = 100
  //   }
  // )

  console.log('rerender home')

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => dispatch(onSetToken())}>
        <Text>Logout</Text>
      </TouchableOpacity> */}

      <PostFlatList posts={posts} hasMoreToLoad={hasMoreToLoad} onLoadMore={handleLoadMore} />

      {/* <RecyclerListView
        style={{ flex: 1 }}
        // contentContainerStyle={{ margin: 3 }}
        onEndReached={handleLoadMore}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        canChangeSize
        forceNonDeterministicRendering
        rowRenderer={renderItemRecyclerListView}
        // renderFooter={renderFooter}
      /> */}
    </View>
  )
}
export const HomeScreen = memo(HomeScreenComponent, isEqual)
