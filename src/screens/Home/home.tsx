/* eslint-disable react-hooks/exhaustive-deps */
import { FirebasePagination, Post } from '@src/models'
import { postService } from '@src/services'
import { Unsubscribe } from 'firebase/firestore'
import React, { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { View } from 'react-native'
import { PostFlatList } from './components/post-flat-list'
import styles from './styles'

const HomeScreenComponent = () => {
  const [posts, setPosts] = useState<Post[]>([])
  // TODO: add skeleton post
  const [loading, setLoading] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [pagination, setPagination] = useState<FirebasePagination>({
    page: 1,
    limit: 4
  })

  const onLoadPostsSuccess = (result: { posts: any; lastDoc: any; isLast: any }) => {
    if (pagination.page === 1) {
      setPosts(result.posts)
    } else {
      setPosts([...posts, ...result.posts])
    }
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

    increasePagination()
  }

  const handleRefresh = () => {
    setHasMoreToLoad(true)
    setPagination({ ...pagination, page: 1, startAfter: undefined })
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => dispatch(onSetToken())}>
        <Text>Logout</Text>
      </TouchableOpacity> */}

      <PostFlatList
        posts={posts}
        hasMoreToLoad={hasMoreToLoad}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
      />
    </View>
  )
}
export const HomeScreen = memo(HomeScreenComponent, isEqual)
