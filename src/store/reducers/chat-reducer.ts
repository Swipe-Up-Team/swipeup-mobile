import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialChatbotMessages } from '@src/constants'
import { SLICE_NAME } from '@src/constants/enums'
import { Conversation, ConversationMembers, Message } from '@src/models'

export interface ListConversationState {
  conversations: Conversation[]
  conversationMembers: ConversationMembers[]
  chatbotConversation: Message[]
}

const initialState: ListConversationState = {
  conversations: [],
  conversationMembers: [],
  chatbotConversation: initialChatbotMessages
}

const chat = createSlice({
  name: SLICE_NAME.CHAT,
  initialState: initialState,
  reducers: {
    onSetConversations: (state, { payload }: PayloadAction<Conversation[]>) => {
      state.conversations = payload
    },
    onSetConversationMembers: (state, { payload }: PayloadAction<ConversationMembers>) => {
      if (!state.conversationMembers || state.conversationMembers.length === 0) {
        state.conversationMembers = [payload]
        return
      }

      const index = state.conversationMembers.findIndex(
        x => x.conversationId === payload.conversationId
      )

      if (index === -1) {
        state.conversationMembers = [...state.conversationMembers, payload]
      } else {
        state.conversationMembers[index] = payload
      }
    },
    onAddChatbotMessage: (state, { payload }: PayloadAction<Message>) => {
      state.chatbotConversation.push(payload)
    },
    onClearChatState: state => {
      state.conversations = []
      state.conversationMembers = []
      state.chatbotConversation = initialChatbotMessages
    }
  }
})

const chatReducer = chat.reducer

export default chatReducer

export const { onSetConversations, onSetConversationMembers, onClearChatState } = chat.actions
