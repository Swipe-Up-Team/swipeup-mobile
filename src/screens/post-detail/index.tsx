import { CommentCard, NavigationBar } from '@src/components'
import { CommentInput } from '@src/components/comment-input'
import { Comment } from '@src/models'
import { goBack } from '@src/navigation/navigation-service'
import { Spinner } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EmptyComment } from './components/empty-comment'
import styles from './styles'

export function PostDetailScreen() {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const [reply, setReply] = useState(false)

  const COMMENTS: Comment[] = [
    {
      id: 'comment 1',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 2',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 3',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 4',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 5',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 6',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 7',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    },
    {
      id: 'comment 8',
      reacts: [
        {
          type: 'like',
          userId: '1'
        }
      ],
      authorId: 'duckhoa',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      postId: 'post1',
      createdAt: 'just now',
      updatedAt: 'just now',
      images: ['https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg']
    }
  ]

  const ListEmptyComponent = () => <EmptyComment />

  const handleLoadMore = () => {}

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View style={styles.emptyContainer}>
        <Spinner />
      </View>
    )
  }

  useEffect(() => {
    //load comments from comments API and store in state. Pass post.id as argument to the API.
    setTimeout(() => {
      setLoading(false)
    }, 2000) //for loading comments demo
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title="Comments" callback={goBack} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {loading ? (
          <View style={styles.emptyContainer}>
            <Spinner />
          </View>
        ) : (
          <FlatList
            keyboardShouldPersistTaps={'always'}
            // onScroll={handleScroll}
            data={COMMENTS}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={styles.commentListContainer}
            keyExtractor={data => data.id}
            // TODO: add this
            // listEmptyComponent={ListEmptyComponent}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.5}
            // onEndReached={hasMoreToLoad ? handleLoadMore : null}
            renderItem={({ item }) => (
              <CommentCard item={item} key={item.id} onSharePress={() => setReply(!reply)} />
            )}
          />
        )}
        <CommentInput reply={reply} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

{
  /* <View style={styles.placeholderContainer}>
<MaterialCommunityIcons
  name="camera-outline"
  size={28}
  color="black"
  onPress={() => alert('Camera')}
/>
<Input
  // autoFocus
  multiline
  placeholder="Add a comment..."
  style={styles.placeholder}
  value={value}
  onChangeText={nextValue => setValue(nextValue)}
/>
<TextInput
  autoFocus
  placeholder={'Add a comment...'}
  multiline
  value={text}
  onChangeText={setText}
  style={styles.placeholder}
/>
<TouchableOpacity activeOpacity={0.8} onPress={onPressSend}>
  {text ? (
    <MaterialCommunityIcons name="send" size={28} color={BLUE} />
  ) : (
    <MaterialIcons name="emoji-emotions" size={28} color={'lightgrey'} />
  )}
</TouchableOpacity>
</View> */
}
