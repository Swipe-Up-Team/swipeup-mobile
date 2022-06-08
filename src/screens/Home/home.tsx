import { AddPostCard, PostCard, StyledDivider } from '@src/components'
import { Post } from '@src/models'
import { Spinner } from '@ui-kitten/components'
import React, { useState } from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { onSetToken } from '@src/store/reducers/app-reducer'
import { dispatch, getState } from '@src/common'

export function HomeScreen() {
  const [loading, setLoading] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)

  console.log('HomeScreen: ', getState('user').user)

  const POSTS: Post[] = [
    {
      id: '1',
      creator: {
        id: 'post-creator',
        name: 'Võ Hoàng Đức Khoa',
        avatar:
          'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609'
      },
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      comments: [
        {
          id: 'cmt1',
          reacts: [
            {
              type: 'like',
              userId: '1'
            }
          ],
          authorId: '1',
          text: 'comment',
          postId: '1',
          createdAt: '1 min ago',
          updatedAt: '1 min ago',
          repliesId: [],
          replyToCommentIds: []
        }
      ],
      shares: 3,
      createdAt: '5 mins ago',
      updatedAt: '5 mins ago',
      content: {
        text: 'hê lô e ve ri bo đi Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        images: [
          'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg',
          'https://konsept-client.vercel.app/dist/src/assets/images/hien.jpg',
          'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg',
          'https://konsept-client.vercel.app/dist/src/assets/images/tuyen.jpg'
        ]
      },
      type: 'tẽt',
      authorId: '1'
    }
  ]

  const handleLoadMore = async () => {}

  const renderFooter = () => {
    if (!loading || !hasMoreToLoad) return null
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(onSetToken())}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <FlatList
        data={POSTS}
        showsVerticalScrollIndicator={false}
        style={styles.posts}
        // TODO:
        // onRefresh
        // ListEmptyComponent={ListEmpty}
        keyExtractor={data => data.id}
        ItemSeparatorComponent={StyledDivider}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={hasMoreToLoad ? handleLoadMore : null}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={<AddPostCard />}
      />
    </View>
  )
}
