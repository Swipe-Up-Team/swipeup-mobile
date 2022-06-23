import {
  BookmarkFillIcon,
  BottomSheet,
  EditFillIcon,
  InfoIcon,
  RemoveFillIcon
} from '@src/components'
import React from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import styles from '@src/components/bottom-sheet/styles'
import { Text } from '@ui-kitten/components'
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import { dispatch, getState } from '@src/common'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { onEditPostStart } from '@src/store/reducers/post-reducer'
import { postService } from '@src/services'
import { onEndProcess, onStartProcess } from '@src/store/reducers/app-reducer'
import Toast from 'react-native-toast-message'

export const PostOptionsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.POST_OPTIONS_MODAL>>()
  const { user } = getState('user')
  const { post } = route.params

  const handleEditPostPress = () => {
    dispatch(onEditPostStart(post.id))
    navigate(APP_SCREEN.ADD_POST, {})

    // close post options modal
    navigation.dispatch(state => {
      state.routes.splice(state.routes.length - 2, 1)

      return CommonActions.reset({
        ...state,
        routes: state.routes,
        index: state.routes.length - 1
      })
    })
  }

  const handleDeletePostPress = async () => {
    dispatch(onStartProcess())
    await postService.deletePost(post.id)

    goBack()
    dispatch(onEndProcess())

    Toast.show({
      type: 'success',
      text1: 'Your post was deleted successfully'
    })
  }

  const confirmDeletePost = () => {
    Alert.alert(
      'Are you sure?',
      "This post will be permanently deleted and you won't be able to see it anymore.",
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: goBack
        },
        { text: 'Confirm', onPress: handleDeletePostPress }
      ]
    )
  }

  return (
    <BottomSheet title="Post Options">
      {post.authorId === user?.id ? (
        <View>
          <TouchableOpacity style={styles.optionItem} onPress={handleEditPostPress}>
            <View style={styles.optionItemIcon}>
              <EditFillIcon />
            </View>
            <View style={styles.optionItemContent}>
              <Text style={styles.optionItemText}>Edit post</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={confirmDeletePost}>
            <View style={styles.optionItemIcon}>
              <RemoveFillIcon fill="#CC251C" />
            </View>
            <View style={styles.optionItemContent}>
              <Text status={'danger'} style={[styles.optionItemText]}>
                Delete post
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.optionItem}>
            <View style={styles.optionItemIcon}>
              <BookmarkFillIcon />
            </View>
            <View style={styles.optionItemContent}>
              <Text style={styles.optionItemText}>Save post</Text>
              <Text appearance="hint" style={styles.smallDescription}>
                Add this to your saved items.
              </Text>
            </View>
          </View>
          <View style={styles.optionItem}>
            <View style={styles.optionItemIcon}>
              <InfoIcon fill="#CC251C" stroke="#CC251C" />
            </View>
            <View style={styles.optionItemContent}>
              <Text status={'danger'} style={[styles.optionItemText]}>
                Report post
              </Text>
            </View>
          </View>
        </View>
      )}
    </BottomSheet>
  )
}
