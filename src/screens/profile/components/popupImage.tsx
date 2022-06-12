// import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '@src/constants'
// import React from 'react'
// import {
//   Animated,
//   Image,
//   ImageBackground,
//   LayoutChangeEvent,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native'
// import { Post, User } from '@src/models'
// import { PopupImageLocation } from '../profile'
// import { useSelector } from '@src/common'
// import ExpoFastImage from 'expo-fast-image'

// interface Prop {
//   selectedPhoto: Post
//   refProps: React.MutableRefObject<{
//     currentTab: number
//     currentGalleryTab: number
//     headerHeight: number
//     showHeaderTab: boolean
//     prePopupImage: {
//       pX: number
//       pY: number
//       w: number
//       h: number
//     }
//   }>
//   _popupImageLocation: PopupImageLocation
// }

// export default function PopupImage({ selectedPhoto, refProps, _popupImageLocation }: Prop) {
//   const user = useSelector(state => state.user).user as User
//   const { _popupImageTop, _popupImageLeft, _popupImageWidth, _popupImageHeight } =
//     _popupImageLocation

//   const _onAnimatePopup = ({ nativeEvent }: LayoutChangeEvent) => {
//     if (selectedPhoto?.content.images) {
//       Image.getSize(
//         selectedPhoto?.content.images[0],
//         (xwidth: number, xheight: number) => {
//           const nextHeight = (xheight * 0.9 * SCREEN_WIDTH) / xwidth
//           _popupImageTop.setValue(refProps.current.prePopupImage.pY - 44)
//           _popupImageLeft.setValue(refProps.current.prePopupImage.pX)
//           _popupImageWidth.setValue(refProps.current.prePopupImage.w)
//           _popupImageHeight.setValue(refProps.current.prePopupImage.h)
//           Animated.spring(_popupImageTop, {
//             toValue: (nativeEvent.layout.height - nextHeight) / 2,
//             useNativeDriver: false
//           }).start()
//           Animated.spring(_popupImageLeft, {
//             toValue: (nativeEvent.layout.width - 0.9 * SCREEN_WIDTH) / 2,
//             useNativeDriver: false
//           }).start()
//           Animated.spring(_popupImageWidth, {
//             toValue: 0.9 * SCREEN_WIDTH,
//             useNativeDriver: false
//           }).start()
//           Animated.spring(_popupImageHeight, {
//             toValue: nextHeight,
//             useNativeDriver: false
//           }).start()
//         },
//         Function
//       )
//     }
//   }

//   return !selectedPhoto?.content?.images ? null : (
//     <View style={styles.container}>
//       <ImageBackground
//         onLayout={_onAnimatePopup}
//         blurRadius={20}
//         style={styles.imageBackground}
//         source={{ uri: selectedPhoto.content.images[0], cache: 'force-cache' }}
//       >
//         <Animated.View
//           style={{
//             width: _popupImageWidth,
//             position: 'absolute',
//             top: _popupImageTop,
//             left: _popupImageLeft,
//             borderRadius: 20,
//             overflow: 'hidden'
//           }}
//         >
//           <View style={styles.profile__user}>
//             <ExpoFastImage
//               style={styles.profile__user_avatar}
//               source={{ uri: user.avatar, priority: ExpoFastImage.priority.normal }}
//             />
//             <Text style={{ fontWeight: '500' }}>{user.name}</Text>
//           </View>
//           <Animated.View
//             style={{
//               height: _popupImageHeight,
//               width: _popupImageWidth
//             }}
//           >
//             <ExpoFastImage
//               style={{
//                 width: '100%',
//                 height: '100%'
//               }}
//               source={{
//                 uri: selectedPhoto.content.images[0],
//                 priority: ExpoFastImage.priority.high
//               }}
//             />
//           </Animated.View>
//         </Animated.View>
//       </ImageBackground>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     left: 0,
//     // top: STATUS_BAR_HEIGHT,
//     zIndex: 99
//   },
//   imageBackground: {
//     position: 'relative',
//     width: '100%',
//     height: '100%'
//   },
//   profile__user: {
//     backgroundColor: '#fff',
//     height: 40,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%'
//   },
//   profile__user_avatar: {
//     width: 30,
//     height: 30,
//     borderRadius: 30,
//     marginLeft: 15,
//     marginRight: 10
//   }
// })
