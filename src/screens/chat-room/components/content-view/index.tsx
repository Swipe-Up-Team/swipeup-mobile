// import { getState, useArray, useSelector } from '@src/common'
// import { MicIcon, PaperPlaneIcon, PlusIcon, XIcon } from '@src/components'
// import { Message } from '@src/models'
// import { navigate } from '@src/navigation/navigation-service'
// import { APP_SCREEN, RootStackParamList } from '@src/navigation/screen-types'
// import { chatService } from '@src/services/chat-service'
// import { Button, Icon, IconElement, Input, List } from '@ui-kitten/components'
// import React, { useEffect, useRef, useState } from 'react'
// import { View, Text, KeyboardAvoidingView, Platform, ImageStyle } from 'react-native'
// import { AttachmentsMenu } from '../attachment-menu'
// import ReceivedMessage from '../message/received-message'
// import SentMessage from '../message/sent-message'
// import TypingMessage from '../message/typing-message'
// import styles from './styles'
// import * as MediaLibrary from 'expo-media-library'
// import { RouteProp, useRoute } from '@react-navigation/native'
// import { ChoseAsset } from '@src/screens/add-post/components'

// export const ContentView = ({ conversationId }: any) => {
//   const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.CHAT_ROOM>>()

//   const userId = getState('user').user?.id
//   const { systemAssets } = getState('systemAssets')
//   const conversation = useSelector(x => x.chat.conversations.find(x => x.id === conversationId))

//   const listRef = useRef<List>(null)

//   const [inputMessage, setinputMessage] = useState('')
//   const [messageList, setMessageList] = useState<Message[]>([])
//   const [attachmentsMenuVisible, setAttachmentsMenuVisible] = useState<boolean>(false)

//   const [selectedAssets, selectedAssetsActions] = useArray<MediaLibrary.Asset>([])

//   const renderItem = ({ item, index }: any) => {
//     // Sent Message
//     if (item.senderId === userId) {
//       // display Date Divider
//       if (
//         index === 0 ||
//         new Date(messageList[index].createdAt).getDay() !==
//           new Date(messageList[index - 1].createdAt).getDay()
//       ) {
//         if (
//           // index !== messageList.length - 1 &&
//           new Date(messageList[index].createdAt).getDay() ===
//           new Date(messageList[index + 1].createdAt).getDay()
//         ) {
//           return <SentMessage message={item} displayDate />
//         } else if (
//           // index !== messageList.length - 1 &&
//           new Date(messageList[index].createdAt).getDay() !==
//           new Date(messageList[index + 1].createdAt).getDay()
//         ) {
//           return <SentMessage message={item} displayDate displayTime />
//         } else {
//           return <SentMessage message={item} displayDate displayTime />
//         }
//       }
//       // display Time label
//       else if (
//         index === messageList.length - 1 ||
//         new Date(messageList[index].createdAt).getDay() !==
//           new Date(messageList[index + 1].createdAt).getDay()
//       ) {
//         return <SentMessage message={item} displayTime />
//       } else if (
//         messageList[index + 1].senderId !== userId &&
//         new Date(messageList[index].createdAt).getDay() ===
//           new Date(messageList[index + 1].createdAt).getDay()
//       ) {
//         return <SentMessage message={item} displayTime />
//       }
//       // default case
//       else {
//         return <SentMessage message={item} />
//       }
//     }
//     // Received Message
//     else {
//       if (
//         index === 0 ||
//         new Date(messageList[index].createdAt).getDay() !==
//           new Date(messageList[index - 1].createdAt).getDay()
//       ) {
//         return (
//           <ReceivedMessage
//             message={item}
//             date={messageList[index].createdAt}
//             displayTime
//             displayAvatar
//           />
//         )
//       } else if (messageList[index].senderId !== messageList[index - 1].senderId) {
//         return <ReceivedMessage message={item} displayTime displayAvatar />
//       } else {
//         return <ReceivedMessage message={item} />
//       }
//     }
//   }

//   const sendMessage = async () => {
//     if (inputMessage.length === 0) return

//     const message: Message = {
//       senderId: userId!,
//       message: inputMessage.trim(),
//       createdAt: new Date().getTime()
//     }

//     await chatService.sendMessage(message, conversationId)
//   }

//   const toggleAttachmentsMenu = (): void => {
//     setAttachmentsMenuVisible(!attachmentsMenuVisible)
//   }

//   const handleSelectPhoto = async () => {
//     navigate(APP_SCREEN.GALLERY_CHOOSER, { selectedAssets, prevScreen: APP_SCREEN.CHAT_ROOM })
//   }

//   const handleRemoveAsset = (idx: number) => {
//     selectedAssetsActions.removeIndex(idx)
//   }

//   const renderAttachmentsMenu = (): React.ReactElement => (
//     <AttachmentsMenu
//       onSelectPhoto={handleSelectPhoto}
//       onSelectFile={toggleAttachmentsMenu}
//       onSelectLocation={toggleAttachmentsMenu}
//       onSelectContact={toggleAttachmentsMenu}
//       onAttachmentSelect={toggleAttachmentsMenu}
//       onCameraPress={toggleAttachmentsMenu}
//       onDismiss={toggleAttachmentsMenu}
//     />
//   )

//   useEffect(() => {
//     setMessageList(conversation?.messages)
//   }, [conversation])

//   useEffect(() => {
//     if (route.params?.selectedAssetIndexes && route.params?.selectedAssetIndexes.length > 0) {
//       const _selectedAssets: MediaLibrary.Asset[] = []
//       route.params?.selectedAssetIndexes.forEach(idx => _selectedAssets.push(systemAssets[idx]))
//       selectedAssetsActions.setValue(_selectedAssets)
//     }
//   }, [route.params?.selectedAssetIndexes])

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.container}>
//         <List
//           style={styles.messageContainer}
//           ref={listRef}
//           data={messageList}
//           renderItem={renderItem}
//           // onLayout={() => listRef.current?.scrollToEnd()}
//           // onContentSizeChange={() => listRef.current?.scrollToEnd()}
//         />
//         <View>
          
//           <View style={styles.messageInputContainer}>
            
//             <Button
//               style={[styles.iconButton, styles.attachButton]}
//               accessoryLeft={attachmentsMenuVisible ? XIcon : PlusIcon}
//               onPress={toggleAttachmentsMenu}
//             />
//             <Input
//               style={styles.messageInput}
//               placeholder="Message..."
//               value={inputMessage}
//               onChangeText={setinputMessage}
//               accessoryRight={MicIcon}
//             />
//             <Button
//               appearance="ghost"
//               style={[styles.iconButton, styles.sendButton]}
//               accessoryLeft={PaperPlaneIcon}
//               onPress={sendMessage}
//             />
//           </View>
//         </View>
//         {attachmentsMenuVisible && renderAttachmentsMenu()}
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// export default ContentView
