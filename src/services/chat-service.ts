import { dispatch } from '@src/common'
import { database } from '@src/config'
import { FIREBASE_ENDPOINT } from '@src/constants'
import { Conversation, Message } from '@src/models'
import { onSetConversations } from '@src/store/reducers/chat-reducer'
import { get, onValue, push, ref, set } from 'firebase/database'

export const chatService = {
  sendMessage: async (message: Message, conversationId: string | undefined) => {
    let key = conversationId
    if (!key) {
      key = push(ref(database, FIREBASE_ENDPOINT.CONVERSATIONS)).key || undefined
    }

    await push(
      ref(
        database,
        `${FIREBASE_ENDPOINT.CONVERSATIONS}/${key}/${FIREBASE_ENDPOINT.CONVERSATIONS_MESSAGES}`
      ),
      message
    )
  },

  getConversations: async (userId: string) => {
    let conversations: Conversation[] = []
    onValue(ref(database, FIREBASE_ENDPOINT.CONVERSATIONS), snapshot => {
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

  listenConversation: async (conversationId: string) => {}
}
