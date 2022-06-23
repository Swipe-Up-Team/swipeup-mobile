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
      const index = state.conversationMembers.findIndex(
        x => x.conversationId === payload.conversationId
      )

      if (index === -1) {
        state.conversationMembers = [...state.conversationMembers, payload]
      } else {
        state.conversationMembers[index] = payload
      }
    }
  }
})

const chatReducer = chat.reducer

export default chatReducer

export const { onSetConversations, onSetConversationMembers } = chat.actions
