import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from '@src/constants/enums'
import { Conversation, ConversationMembers } from '@src/models'

export interface ListConversationState {
  conversations: Conversation[]
  conversationMembers: ConversationMembers[]
}

const initialState: ListConversationState = {
  conversations: [],
  conversationMembers: []
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
    onClearChatState: state => {
      state.conversations = []
      state.conversationMembers = []
    }
  }
})

const chatReducer = chat.reducer

export default chatReducer

export const { onSetConversations, onSetConversationMembers, onClearChatState } = chat.actions
