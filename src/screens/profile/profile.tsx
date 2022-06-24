/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useRoute } from '@react-navigation/native'
import { useSelector } from '@src/common'
import { ArrowBack, MoreVerticalIcon, PostCard, StyledDivider } from '@src/components'
import navigationBarStyles from '@src/components/navigation-bar/styles'
import { defaultUser } from '@src/constants'
import { Post, User } from '@src/models'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN, AuthorizeParamsList } from '@src/navigation/screen-types'
import { postService, userService } from '@src/services'
import { Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
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

  // const handleLoadMore = async () => {}

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText} appearance={'hint'}>
        No posts yet
      </Text>
    </View>
  )

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
  }, [user?.avatar])

  useEffect(() => {
    getAllPost()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.navigationBar}>
          {user?.id !== currentUser.id && (
            <TouchableOpacity onPress={goBack} style={navigationBarStyles.btnBack}>
              <ArrowBack />
            </TouchableOpacity>
          )}
          <View style={navigationBarStyles.titleContainer}>
            <Text style={navigationBarStyles.title}>{currentUser.name}</Text>
            {currentUser.id === user?.id && (
              <MoreVerticalIcon
                onPress={() => {
                  navigate(APP_SCREEN.PROFILE_OPTIONS_MODAL)
                }}
              />
            )}
          </View>
          {/* <View style={navigationBarStyles.accessoryRight}>{accessoryRight}</View> */}
        </View>
        <FlatList
          data={allPost}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          style={styles.posts}
          keyExtractor={item => item?.id}
          ItemSeparatorComponent={StyledDivider}
          ListHeaderComponent={
            <>
              <ProfileHeader viewedUser={currentUser} />

              <View style={styles.bioWrapper}>
                <Text style={styles.nameText}>{currentUser.name}</Text>
                <Text style={styles.emailText}>{currentUser.email}</Text>
              </View>

              {friendUserId && friendUserId !== user?.id && (
                <ActionButtonRow currentUser={currentUser} navigation={navigation} />
              )}

              <View style={styles.extraInfoWrapper}>
                <TouchableOpacity style={styles.touch_center}>
                  <Text style={styles.text_extra_info}>{allPost.length}</Text>
                  <Text>Posts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigate(APP_SCREEN.FOLLOWING, { user: currentUser })
                  }}
                  style={styles.touch_center}
                >
                  <Text style={styles.text_extra_info}>{currentUser.followingIDs?.length}</Text>
                  <Text>Following</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
          renderItem={renderPostItem}
          // ListEmptyComponent={ListEmpty}
          // onEndReached={hasMoreToLoad ? handleLoadMore : null}
          // ListHeaderComponent={loginUser.id === userInfo.user.id ? <AddPostCard /> : null}
        />
      </View>
    </SafeAreaView>
  )
}
