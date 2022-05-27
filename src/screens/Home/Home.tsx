import { PostCard, StyledDivider } from '@src/components'
import { Post } from '@src/models'
import { Spinner } from '@ui-kitten/components'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'

export function Home() {
  const [loading, setLoading] = useState(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)

  const POSTS: Post[] = [
    {
      id: '1',
      creator: {
        id: 'post-creator',
        name: 'Võ Hoàng Đức Khoa',
        picture:
          'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609'
      },
      reactions: {
        like: 12,
        angry: 2,
        haha: 4
      },
      comments: 12,
      shares: 3,
      createdAt: '5 mins ago',
      desc: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.'
    },
    {
      id: '2',
      creator: {
        id: 'post-creator',
        name: 'Võ Hoàng Đức Khoa',
        picture:
          'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609'
      },
      reactions: {
        like: 12,
        angry: 2,
        haha: 4
      },
      comments: 12,
      shares: 3,
      createdAt: '5 mins ago',
      desc: 'Hi e ve ri bo đi',
      images: [
        'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609'
      ]
    },
    {
      id: '3',
      creator: {
        id: 'post-creator',
        name: 'Võ Hoàng Đức Khoa',
        picture:
          'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609'
      },
      reactions: {
        like: 12,
        angry: 2,
        haha: 4
      },
      comments: 12,
      shares: 3,
      createdAt: '5 mins ago',
      desc: 'Hi e ve ri bo đi',
      images: [
        'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609',
        'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/273407173_748356902806286_7791746993759264242_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=t52k4eGIHowAX_gvCwq&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9UV2n8N0PPKRCZJA3lAtRf9m9uardu2qrBI8_nUJ6Ppw&oe=62959E9C',
        'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg'
      ]
    },
    {
      id: '4',
      creator: {
        id: 'post-creator',
        name: 'Võ Hoàng Đức Khoa',
        picture:
          'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609'
      },
      reactions: {
        like: 12,
        angry: 2,
        haha: 4
      },
      comments: 12,
      shares: 3,
      createdAt: '5 mins ago',
      desc: 'Hi e ve ri bo đi',
      images: [
        'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/277354606_1735667546794382_2091283980980135583_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFXnVaeGWe0AX_oSYBj&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-Emla3arx5NgYpvN0LhTLti_f0iqxlw0qyqyVpRCMxvQ&oe=62952609',
        'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/273407173_748356902806286_7791746993759264242_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=t52k4eGIHowAX_gvCwq&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9UV2n8N0PPKRCZJA3lAtRf9m9uardu2qrBI8_nUJ6Ppw&oe=62959E9C',
        'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg',
        'https://konsept-client.vercel.app/dist/src/assets/images/binh.jpg'
      ]
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
      <FlatList
        data={POSTS}
        showsVerticalScrollIndicator={false}
        style={styles.posts}
        // TODO:
        // ListEmptyComponent={ListEmpty}
        keyExtractor={data => data.id}
        ItemSeparatorComponent={StyledDivider}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={hasMoreToLoad ? handleLoadMore : null}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  )
}
