import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from '@src/constants/enums'
import { Conversation } from '@src/models'

export interface ListConversationState {
  // loading: boolean;
  // error: string;
  conversations: Conversation[]
  // loaded: boolean;
}

const initialState: ListConversationState = {
  // loading: false,
  // error: '',
  conversations: []
  // loaded: false,
}

const chat = createSlice({
  name: SLICE_NAME.CHAT,
  initialState: initialState,
  reducers: {
    onSetConversations: (state, { payload }: PayloadAction<Conversation[]>) => {
      state.conversations = payload
    }
  }
})

const chatReducer = chat.reducer

export default chatReducer

export const { onSetConversations } = chat.actions
