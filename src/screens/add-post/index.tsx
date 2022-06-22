/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { RouteProp, useRoute } from '@react-navigation/native'
import { dispatch, getState, useArray, useSelector } from '@src/common'
import {
  CloseIcon,
  NavigationBar,
  PostPhotoBigIcon,
  PostTagFriendBigIcon,
  PostVideoBigIcon,
  UserAvatarSquare
} from '@src/components'
import { STORAGE_ENDPOINT } from '@src/constants'
import { Post, PostPayload } from '@src/models'
import { goBack, navigate } from '@src/navigation/navigation-service'
import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
import { storageService } from '@src/services'
import { postService } from '@src/services/post-services'
import { onEndProcess, onStartProcess } from '@src/store/reducers/app-reducer'
import { clearDraftPost, onEditPostEnd, saveDraftPost } from '@src/store/reducers/post-reducer'
import { Button, Text } from '@ui-kitten/components'
import * as MediaLibrary from 'expo-media-library'
import React, { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import {
  Alert,
  Animated as RNAnimated,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
  View
} from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChoseAsset } from './components'
import styles from './styles'

const screenWidth = Math.round(Dimensions.get('window').width)

// TODO: handle redirect to Unauthenticated screen if no user
const AddPostScreenComponent = () => {
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.ADD_POST>>()
  const { systemAssets } = getState('systemAssets')
  const { editingId, draftPost } = useSelector(x => x.post)
  const { user } = getState('user')
  const [selectedAssets, selectedAssetsActions] = useArray<MediaLibrary.Asset>([])
  const [textPost, setTextPost] = useState('')
  const [mode, setMode] = useState<'add' | 'edit'>()

  // ANIMATION VARS
  const editorWrapperHeight = useSharedValue(100)
  let isShowBgColors = true
  const _bgColorListWidth = new RNAnimated.Value(screenWidth - 60)
  const _toggleZIndexValue = new RNAnimated.Value(2)
  const _degTransformToggle = new RNAnimated.Value(0)
  let isKeyBoardVisible = false

  let _prevTranslationY = 0
  const scaleTransformToggle = new RNAnimated.Value(0)

  const _distanceTopOption = new RNAnimated.Value(0)
  const distanceTopOption = _distanceTopOption.interpolate({
    inputRange: [-660, 0, 660],
    outputRange: [710, 0, -610]
  })

  // Change to edit mode if has postId
  useEffect(() => {
    console.log('🚀 ~ file: index.tsx ~ line 84 ~ ; ~ editingId', editingId)
    ;(async () => {
      if (editingId) {
        setMode('edit')
        dispatch(onStartProcess())

        const postDetails = await postService.getSinglePostById(editingId)
        const images = postDetails.content.images || []
        selectedAssetsActions.setValue(images)
        setTextPost(postDetails.content.text)

        dispatch(onEndProcess())
      } else {
        setMode('add')

        if (draftPost) {
          if (draftPost.content?.text) setTextPost(draftPost.content?.text)
          if (draftPost.content?.images) selectedAssetsActions.setValue(draftPost.content?.images)
        }
      }
    })()
  }, [editingId])

  // useEffect(() => {
  //   if (draftPost && mode === 'add') {
  //     console.log('has draft', draftPost)
  //     if (draftPost.content?.text) setTextPost(draftPost.content?.text)
  //     if (draftPost.content?.images) selectedAssetsActions.setValue(draftPost.content?.images)
  //   }
  // }, [draftPost])

  const handleAddMediaPress = async () => {
    navigate(APP_SCREEN.GALLERY_CHOOSER, { selectedAssets, prevScreen: APP_SCREEN.ADD_POST })
  }

  const handleRemoveAsset = (idx: number) => {
    selectedAssetsActions.removeIndex(idx)
  }

  // load selected assets from gallery chooser screen
  useEffect(() => {
    if (route.params?.selectedAssetIndexes && route.params?.selectedAssetIndexes.length > 0) {
      const _selectedAssets: MediaLibrary.Asset[] = []
      route.params?.selectedAssetIndexes.forEach(idx => _selectedAssets.push(systemAssets[idx]))

      selectedAssetsActions.setValue(_selectedAssets)
    }
  }, [route.params?.selectedAssetIndexes])

  const handleSubmitPostPress = async () => {
    if (!user) return

    dispatch(onStartProcess())

    // upload images to firebase -> get storage url
    const files = await storageService.uploadMultipleFiles(selectedAssets, STORAGE_ENDPOINT.FILES)

    if (mode === 'add') {
      const newPost: Partial<PostPayload> = {
        content: {
          images: files,
          text: textPost.trim()
        },
        authorId: user?.id
      }
      const result = await postService.createNew(user, newPost)

      if (draftPost) dispatch(clearDraftPost())

      if (result && route.params.onSuccess) route.params.onSuccess(result.id)
    } else {
      const updatedPost: Partial<PostPayload> = {
        id: editingId,
        content: {
          images: files,
          text: textPost.trim()
        }
      }
      await postService.updatePost(updatedPost)
      dispatch(onEditPostEnd())
    }

    dispatch(onEndProcess())
    goBack()
  }

  // ANIMATION FUNCTIONS
  const keyboardWillShow = () => {
    _distanceTopOption.setValue(0)
    _prevTranslationY = 0
  }

  const keyboardDidShow = () => {
    isKeyBoardVisible = true
    if (!isShowBgColors) {
      RNAnimated.timing(scaleTransformToggle, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start(() => {
        _toggleZIndexValue.setValue(2)
        RNAnimated.timing(_degTransformToggle, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start(() => {})
      })
      RNAnimated.spring(_bgColorListWidth, {
        toValue: screenWidth - 60,
        useNativeDriver: true
      }).start(() => {
        isShowBgColors = true
      })
    }
  }

  const keyboardDidHide = () => {
    isKeyBoardVisible = false
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)
  }, [])

  const onContentSizeChangeHandler = ({
    nativeEvent
  }: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const { height } = nativeEvent.contentSize
    editorWrapperHeight.value = height + 20
  }
  const onGestureEventHandler = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    if (!isKeyBoardVisible) {
      const { translationY } = nativeEvent
      if (_prevTranslationY - translationY > 610) return
      _distanceTopOption.setValue(_prevTranslationY - translationY)
    }
  }
  const onHandlerStateChangeHandler = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
    if (isKeyBoardVisible) return
    if (nativeEvent.state === State.END) {
      let { translationY } = nativeEvent
      translationY = _prevTranslationY - translationY
      if (Math.abs(translationY) < 150) {
        RNAnimated.spring(_distanceTopOption, {
          toValue: 0,
          useNativeDriver: true
        }).start(() => (_prevTranslationY = 0))
      } else if (Math.abs(translationY) > 150 && Math.abs(translationY) < 350) {
        RNAnimated.spring(_distanceTopOption, {
          toValue: 247.5,
          useNativeDriver: true
        }).start(() => (_prevTranslationY = 247.5))
      } else {
        RNAnimated.spring(_distanceTopOption, {
          toValue: 600,
          useNativeDriver: true
        }).start(() => (_prevTranslationY = 600))
      }
    }
  }

  const onPressShowOptions = () => {
    Keyboard.dismiss()
    if (_prevTranslationY === 0) {
      RNAnimated.spring(_distanceTopOption, {
        toValue: 247.5,
        useNativeDriver: true
      }).start(() => (_prevTranslationY = 247.5))
    } else if (_prevTranslationY === 247.5) {
      RNAnimated.spring(_distanceTopOption, {
        toValue: 600,
        useNativeDriver: true
      }).start(() => (_prevTranslationY = 600))
    } else {
      RNAnimated.spring(_distanceTopOption, {
        toValue: 247.5,
        useNativeDriver: true
      }).start(() => (_prevTranslationY = 247.5))
    }
  }

  const editorWrapperAnimatedStyle = useAnimatedStyle(() => ({
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    height: editorWrapperHeight.value
  }))

  // handle go back click
  const savePostAsDraft = () => {
    const _draftPost: Partial<Post> = {
      content: {
        text: textPost,
        images: selectedAssets
      }
    }

    dispatch(saveDraftPost(_draftPost))
    goBack()
  }

  const handleDiscardPost = () => {
    if (draftPost) dispatch(clearDraftPost())
    return goBack()
  }
  const confirmGoBack = () => {
    if (mode === 'edit') {
      dispatch(onEditPostEnd())
      return goBack()
    }

    if (!textPost && selectedAssets.length === 0) return goBack()

    Alert.alert('Save this post as a draft?', "If you discard now, you'll lose this post.", [
      { text: 'Save Draft', onPress: savePostAsDraft },
      { text: 'Discard Post', onPress: handleDiscardPost, style: 'destructive' },
      {
        text: 'Keep Editing',
        style: 'cancel'
      }
    ])
  }

  return (
    <KeyboardAvoidingView style={styles.parentContainer} enabled behavior="height">
      <SafeAreaView style={styles.container}>
        <NavigationBar
          title={mode === 'add' ? 'Create Post' : 'Edit Post'}
          callback={confirmGoBack}
          iconLeft={<CloseIcon />}
          accessoryRight={
            <TouchableOpacity style={styles.accessoryRightNavigationBar}>
              <Button size="small" onPress={handleSubmitPostPress}>
                {mode === 'add' ? 'Post' : 'Edit'}
              </Button>
            </TouchableOpacity>
          }
        />

        <View style={styles.infoWrapper}>
          {/* TODO: get user state */}
          <UserAvatarSquare uri={user?.avatar} />
          <View style={styles.postInfoWrapper}>
            <Text style={styles.name}>{user?.name}</Text>
            <View style={styles.areaWrapper}>
              {/* FIXME: un-comment if has post status */}
              {/* <TouchableOpacity
                style={styles.areaOption}
                onPress={() => {
                  navigate(APP_SCREEN.POST_STATUS_OPTIONS_MODAL)
                }}
              >
                <Text>Public</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>

        <View style={styles.editorWrapper}>
          <Animated.View style={editorWrapperAnimatedStyle}>
            <TextInput
              autoFocus
              multiline
              placeholder="What are you thinking?"
              placeholderTextColor="#96A0B0"
              style={styles.editor}
              onContentSizeChange={onContentSizeChangeHandler}
              value={textPost}
              onChangeText={setTextPost}
            />
          </Animated.View>
        </View>

        {/* TODO: handle remove/onPress for each image */}
        <FlatList
          horizontal
          data={selectedAssets}
          keyExtractor={data => data.id}
          style={styles.selectedAssetsWrapper}
          contentContainerStyle={styles.selectedAssetsContentWrapper}
          renderItem={({ item, index }) => (
            <ChoseAsset key={item.id} item={item} onRemove={() => handleRemoveAsset(index)} />
          )}
        />

        <RNAnimated.View style={styles.toolOptionsWrapper}>
          <PanGestureHandler
            onGestureEvent={onGestureEventHandler}
            onHandlerStateChange={onHandlerStateChangeHandler}
            enabled={true}
          >
            <RNAnimated.View
              style={{
                ...styles.optionsWrapper,
                transform: [{ translateY: distanceTopOption }]
              }}
            >
              <TouchableWithoutFeedback onPress={onPressShowOptions}>
                <View style={[styles.optionContainer, { justifyContent: 'space-between' }]}>
                  <Text style={styles.optionText}>Add to your post</Text>
                  <View style={styles.optionImagesWrapper}>
                    <View style={styles.optionImage}>
                      <PostPhotoBigIcon />
                    </View>
                    <View style={styles.optionImage}>
                      <PostVideoBigIcon />
                    </View>
                    <View style={styles.optionImage}>
                      <PostTagFriendBigIcon />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity onPress={handleAddMediaPress}>
                <View style={styles.optionContainer}>
                  <View style={{ ...styles.optionImage, width: 30, marginRight: 15 }}>
                    <PostPhotoBigIcon />
                  </View>
                  <Text style={styles.optionText}>Image/Video</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <View style={{ ...styles.optionImage, width: 30, marginRight: 15 }}>
                    <PostTagFriendBigIcon />
                  </View>
                  <Text style={styles.optionText}>Tag your friends</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Emotion/Activity</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Check in</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Live Stream</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>3D Image</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>File GIF</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Watch together</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Request recommends</Text>
                </View>
              </TouchableOpacity>
            </RNAnimated.View>
          </PanGestureHandler>
        </RNAnimated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
export const AddPostScreen = memo(AddPostScreenComponent, isEqual)
