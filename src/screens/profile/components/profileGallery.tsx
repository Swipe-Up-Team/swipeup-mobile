// import AccountGallery from '@src/components/account-gallery'
// import { SCREEN_WIDTH } from '@src/constants'
// import { Post } from '@src/models'
// import { Icon } from '@ui-kitten/components'
// import React from 'react'
// import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

// export interface Props {
//   photos: Post[]
//   tabLineOffsetX: Animated.Value
//   scrollTabRef: React.RefObject<ScrollView>

//   hidePopupImage: () => void
//   showPopupImage: (e: { pX: number; pY: number; w: number; h: number }, photo: Post) => void
//   onToggleGalleryTab: (tab: number) => void
//   onScrollEndDragGalleryTabScroll: ({
//     nativeEvent: {
//       contentOffset: { x }
//     }
//   }: NativeSyntheticEvent<NativeScrollEvent>) => void
// }

// const styles = StyleSheet.create({
//   galleryContainer: {
//     width: '100%'
//   },
//   galleryTabWrapper: {
//     flexDirection: 'row',
//     borderBottomColor: '#ddd',
//     borderBottomWidth: 0.5,
//     borderTopColor: '#ddd',
//     borderTopWidth: 0.5
//   },
//   galleryTab: {
//     width: SCREEN_WIDTH * 0.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 44
//   },
//   tabLine: {
//     bottom: -1,
//     height: 2,
//     backgroundColor: '#000',
//     position: 'absolute',
//     width: SCREEN_WIDTH / 2
//   }
// })

// export default function ProfileGallery({
//   tabLineOffsetX,
//   scrollTabRef,
//   onToggleGalleryTab,
//   onScrollEndDragGalleryTabScroll,
//   hidePopupImage,
//   showPopupImage,
//   photos
// }: Props) {
//   return (
//     <View style={styles.galleryContainer}>
//       <View style={styles.galleryTabWrapper}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={onToggleGalleryTab.bind(null, 1)}
//           style={styles.galleryTab}
//         >
//           <Icon name="grid" width={24} height={24} fill="#333" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={onToggleGalleryTab.bind(null, 2)}
//           style={styles.galleryTab}
//         >
//           <Icon name="image-outline" width={24} height={24} fill="#333" />
//         </TouchableOpacity>
//         <Animated.View
//           style={{
//             ...styles.tabLine,
//             left: tabLineOffsetX
//           }}
//         />
//       </View>
//       <ScrollView
//         onScrollEndDrag={onScrollEndDragGalleryTabScroll}
//         bounces={false}
//         ref={scrollTabRef}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//       >
//         <TouchableOpacity
//           // eslint-disable-next-line react-native/no-inline-styles
//           style={{
//             marginTop: 5,
//             flexDirection: 'row'
//           }}
//           activeOpacity={1}
//         >
//           <AccountGallery
//             photos={photos || []}
//             hidePopupImage={hidePopupImage}
//             showPopupImage={showPopupImage}
//           />
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   )
// }
