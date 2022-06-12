/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useRoute } from '@react-navigation/native'
import { useSelector } from '@src/common'
import { AddPostCard, PostCard, StyledDivider } from '@src/components'
import { Post, User } from '@src/models'
import { navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import { Icon, Spinner } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActionButtonRow } from './components/action-button-row'
import ProfileHeader from './components/profile-header'
import styles from './styles'

/**
 * 1 - Followed
 * 2 - Unfollow
 * 3 - User login Profile
 */
type UserInfo = {
  user: User
  followType: number
}

export default function ProfileScreen() {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ScrollView style={styles.w_full}>
          <TouchableOpacity activeOpacity={1}>
            <View>
              <ProfileHeader user={userInfo.user} />

              <View style={styles.bioWrapper}>
                <Text style={styles.nameText}>{userInfo.user.name}</Text>
                <Text style={styles.emailText}>{userInfo.user.email}</Text>
              </View>

              <ActionButtonRow />

              <View style={styles.extraInfoWrapper}>
                <TouchableOpacity style={styles.touch_center}>
                  <Text style={styles.text_extra_info}>{photos?.length}</Text>
                  <Text>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate(APP_SCREEN.FOLLOWING, {})
                  }}
                  style={styles.touch_center}
                >
                  <Text style={styles.text_extra_info}>{userInfo.user?.followingIDs?.length}</Text>
                  <Text>Following</Text>
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: '#fff' }}>
                <FlatList
                  data={photos}
                  showsVerticalScrollIndicator={false}
                  style={styles.posts}
                  keyExtractor={item => item?.id}
                  ItemSeparatorComponent={StyledDivider}
                  ListFooterComponent={renderFooter}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => <PostCard post={item} />}
                  // ListEmptyComponent={ListEmpty}
                  // onEndReached={hasMoreToLoad ? handleLoadMore : null}
                  // ListHeaderComponent={loginUser.id === userInfo.user.id ? <AddPostCard /> : null}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
