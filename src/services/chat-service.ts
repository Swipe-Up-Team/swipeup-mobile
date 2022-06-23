import { dispatch } from '@src/common'
import { database } from '@src/config'
import { REALTIMEDB_ENDPOINT, STORAGE_ENDPOINT, USERIDS_DIVIDER } from '@src/constants'
import { Conversation, CONVERSATION_TYPE, Message, MESSAGE_TYPE } from '@src/models'
import { onSetConversations } from '@src/store/reducers/chat-reducer'
import { get, onValue, push, ref, update } from 'firebase/database'
import * as MediaLibrary from 'expo-media-library'
import { storageService } from './storage-services'

export const chatService = {
  getKeyPush: (conversationId: string | undefined) => {
    return conversationId
      ? conversationId
      : push(ref(database, REALTIMEDB_ENDPOINT.CONVERSATIONS)).key || undefined
  },

  createNewConversation: async (myId: string, friendId: string, type: CONVERSATION_TYPE) => {
    const key = chatService.getKeyPush(undefined)

    await update(ref(database, `${REALTIMEDB_ENDPOINT.CONVERSATIONS}/${key}`), {
      id: key!,
      messages: [],
      userIds: myId + USERIDS_DIVIDER + friendId,
      typingIds: '',
      type: type
    })

    return key
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
        type: MESSAGE_TYPE.IMAGE,
        message: '',
        image: url.uri,
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
  },

  getTypingIdList: async (conversationId: string) => {
    const snapshot = await get(
      ref(
        database,
        `${REALTIMEDB_ENDPOINT.CONVERSATIONS}/${conversationId}/${REALTIMEDB_ENDPOINT.CONVERSATIONS_TYPING}`
      )
    )

    if (snapshot.exists()) {
      const typingList = (snapshot.val() as string)
        ? (snapshot.val() as string).split(USERIDS_DIVIDER)
        : []
      return typingList
    }

    return undefined
  },

  sendTypingAction: async (userId: string, conversationId: string) => {
    const typingList = await chatService.getTypingIdList(conversationId)

    if (typingList && !typingList.includes(userId)) {
      typingList.push(userId)
      const newTypingIds = typingList.join(USERIDS_DIVIDER)

      await update(ref(database, `${REALTIMEDB_ENDPOINT.CONVERSATIONS}/${conversationId}`), {
        [REALTIMEDB_ENDPOINT.CONVERSATIONS_TYPING]: newTypingIds
      })
    }
  },

  removeTypingAction: async (userId: string, conversationId: string) => {
    const typingList = await chatService.getTypingIdList(conversationId)

    if (typingList && typingList.includes(userId)) {
      const index = typingList.indexOf(userId)

      typingList.splice(index, 1)
      const newTypingIds = typingList.join(USERIDS_DIVIDER)

      await update(ref(database, `${REALTIMEDB_ENDPOINT.CONVERSATIONS}/${conversationId}`), {
        [REALTIMEDB_ENDPOINT.CONVERSATIONS_TYPING]: newTypingIds
      })
    }
  },

  addMemberToGroup: async (newUserIds: string, conversationId: string) => {
    if (!newUserIds) return

    await update(ref(database, `${REALTIMEDB_ENDPOINT.CONVERSATIONS}/${conversationId}`), {
      [REALTIMEDB_ENDPOINT.CONVERSATIONS_USERIDS]: newUserIds
    })
  }
}
