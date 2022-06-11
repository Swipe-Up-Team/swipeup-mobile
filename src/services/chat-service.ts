import { dispatch } from '@src/common'
import { database } from '@src/config'
import { REALTIMEDB_ENDPOINT, STORAGE_ENDPOINT } from '@src/constants'
import { Conversation, Message } from '@src/models'
import { onSetConversations } from '@src/store/reducers/chat-reducer'
import { get, onValue, push, ref, set } from 'firebase/database'
import * as MediaLibrary from 'expo-media-library'
import { storageService } from './storage-services'

export const chatService = {
  getKeyPush: (conversationId: string | undefined) => {
    return conversationId
      ? conversationId
      : push(ref(database, REALTIMEDB_ENDPOINT.CONVERSATIONS)).key || undefined
  },

  sendTextMessage: async (message: Message, conversationId: string | undefined) => {
    const key = chatService.getKeyPush(conversationId)

    await push(
      ref(
        database,
        `${REALTIMEDB_ENDPOINT.CONVERSATIONS}/${key}/${REALTIMEDB_ENDPOINT.CONVERSATIONS_MESSAGES}`
      ),
      message
    )
  },

  sendImageMessage: async (
    files: MediaLibrary.AssetInfo[],
    userId: string,
    conversationId: string | undefined
  ) => {
    const urls = await storageService.uploadMultipleFiles(files, STORAGE_ENDPOINT.MESSAGE)

    urls.forEach(async url => {
      const message: Message = {
        senderId: userId,
        message: '',
        image: url,
        createdAt: new Date().getTime()
      }

      await chatService.sendTextMessage(message, conversationId)
    })
  },

  getConversations: async (userId: string) => {
    let conversations: Conversation[] = []
    onValue(ref(database, REALTIMEDB_ENDPOINT.CONVERSATIONS), snapshot => {
      if (snapshot.exists()) {
        conversations = []
        const allConversation = snapshot.val()

        // convert Conversation object to Conversation model
        for (const conversationKey in allConversation) {
          const conversation: Conversation = allConversation[conversationKey]
          if (conversation.userIds.includes(userId)) {
            const messages: Message[] = []

            // convert Message object list to Message model
            for (const messagesKey in conversation.messages) {
              const message: Message = conversation.messages[messagesKey]
              messages.push(message)
            }

            conversation.messages = messages
            conversations.push(conversation)
          }
        }
        dispatch(onSetConversations(conversations))
      }
    })
  }
}
