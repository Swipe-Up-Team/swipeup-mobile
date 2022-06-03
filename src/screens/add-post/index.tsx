/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { useInterpolate } from '@src/common/animated'
import { CloseIcon, NavigationBar } from '@src/components'
import { goBack } from '@src/navigation/navigation-service'
import { Avatar, Button, Text } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import {
  Animated as RNAnimated,
  Dimensions,
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
import Animated, { Extrapolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
// import Animated  from 'react-native-reanimated'

const screenWidth = Math.round(Dimensions.get('window').width)

export function AddPostScreen() {
  // const editorWrapperHeight = new RNAnimated.Value(100)
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

  return (
    <KeyboardAvoidingView style={styles.parentContainer} enabled behavior="height">
      <SafeAreaView style={styles.container}>
        <NavigationBar
          title="Create Post"
          callback={goBack}
          iconLeft={<CloseIcon />}
          accessoryRight={
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
              <Button
                size="small"
                onPress={() => {
                  console.log('posted')
                }}
              >
                Post
              </Button>
            </TouchableOpacity>
          }
        />

        <View style={styles.infoWrapper}>
          <Avatar
            shape="square"
            style={styles.avatar}
            source={{ uri: 'https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1
            }}
          >
            <Text style={styles.name}>{'user.name'}</Text>
            <View style={styles.areaWrapper}>
              <TouchableOpacity style={styles.areaOption}>
                <Text>Public</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.editorWrapper}>
          <Animated.View style={editorWrapperAnimatedStyle}>
            <TextInput
              multiline
              placeholder="What are you thinking?"
              placeholderTextColor="#96A0B0"
              style={styles.editor}
              onContentSizeChange={onContentSizeChangeHandler}
            />
          </Animated.View>
        </View>

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
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>Add to your post</Text>
                  {/* <View style={styles.optionImagesWrapper}>
                    <Image
                      style={styles.optionImage}
                      source={require('../../assets/icons/photo.png')}
                    ></Image>
                    <Image
                      style={styles.optionImage}
                      source={require('../../assets/icons/friend.png')}
                    ></Image>
                    <Image
                      style={styles.optionImage}
                      source={require('../../assets/icons/emoji.png')}
                    ></Image>
                    <Image
                      style={styles.optionImage}
                      source={require('../../assets/icons/gps.png')}
                    ></Image>
                  </View> */}
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/photo.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Image/Video</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/friend.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Tag your friends</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/emoji.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Emotion/Activity</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/gps.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Check in</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/live-news.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Live Stream</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/photograph.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/letter-a.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Background</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/360-view.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>3D Image</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/gif.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>File GIF</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/popcorn.png')}
                  ></Image> */}
                  <Text style={styles.optionText}>Watch together</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('do not thing')}>
                <View style={styles.optionContainer}>
                  {/* <Image
                    style={{ ...styles.optionImage, width: 30, marginRight: 15 }}
                    source={require('../../assets/icons/like.png')}
                  ></Image> */}
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
