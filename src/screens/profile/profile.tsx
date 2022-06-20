/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useRoute } from '@react-navigation/native'
import { useSelector } from '@src/common'
import { PostCard, StyledDivider } from '@src/components'
import { defaultUser } from '@src/constants'
import { Post, User } from '@src/models'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import { postService, userService } from '@src/services'
import React, { useEffect, useState } from 'react'
import { RefreshControl, Text, View } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActionButtonRow } from './components/action-button-row'
import ProfileHeader from './components/profile-header'
import styles from './styles'

export default function ProfileScreen({ navigation }: any) {
  const route = useRoute<RouteProp<AuthorizeParamsList, APP_SCREEN.PROFILE>>()
  const friendUserId = route.params?.userId

  const { user } = useSelector(x => x.user)
  const [currentUser, setCurrentUser] = useState<User>(defaultUser)
  const [allPost, setAllPost] = useState<Post[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const handleLoadMore = async () => {}

  const renderFooter = () => {
    // if (!loading || !hasMoreToLoad) return null
    // return (
    //   <View style={styles.spinnerContainer}>
    //     <Spinner />
    //   </View>
    // )
    return null
  }

  const onFollow = () => {}

  const onUnfollow = () => {}

  const onClickFollow = () => {}

  const getFriendUser = async () => {
    const friend = await userService.getUser(friendUserId!)
    setCurrentUser(friend!)
  }

  const getAllPost = async () => {
    const posts = await postService.getAllPostByUserId(friendUserId! ?? user?.id)
    setAllPost(posts)
  }

  const renderPostItem = ({ item }: any) => <PostCard post={item} />

  const handleRefresh = async () => {
    setRefreshing(true)
    await getAllPost()
    setRefreshing(false)
  }

  useEffect(() => {
    // if this is not current user, fetch data
    if (friendUserId) {
      getFriendUser()
    } else {
      setCurrentUser(user!)
    }
  }, [])

  useEffect(() => {
    getAllPost()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ScrollView
          style={styles.w_full}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
          <View>
            <ProfileHeader user={currentUser} />

            <View style={styles.bioWrapper}>
              <Text style={styles.nameText}>{currentUser.name}</Text>
              <Text style={styles.emailText}>{currentUser.email}</Text>
            </View>

            {friendUserId && <ActionButtonRow currentUser={currentUser} navigation={navigation} />}

            <View style={styles.extraInfoWrapper}>
              <TouchableOpacity style={styles.touch_center}>
                <Text style={styles.text_extra_info}>{allPost.length}</Text>
                <Text>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => {
                //   navigate(APP_SCREEN.FOLLOWING, {})
                // }}
                style={styles.touch_center}
              >
                <Text style={styles.text_extra_info}>{currentUser.followingIDs?.length}</Text>
                <Text>Following</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#fff' }}>
              <FlatList
                data={allPost}
                showsVerticalScrollIndicator={false}
                style={styles.posts}
                keyExtractor={item => item?.id}
                ItemSeparatorComponent={StyledDivider}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.5}
                renderItem={renderPostItem}
                // ListEmptyComponent={ListEmpty}
                // onEndReached={hasMoreToLoad ? handleLoadMore : null}
                // ListHeaderComponent={loginUser.id === userInfo.user.id ? <AddPostCard /> : null}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
