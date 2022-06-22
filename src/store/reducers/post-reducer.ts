import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from '@src/constants/enums'
import { Post } from '@src/models'

export interface PostState {
  editingId?: string
  draftPost?: Partial<Post>
}

const initialState: PostState = {
  editingId: undefined,
  draftPost: undefined
}

const post = createSlice({
  name: SLICE_NAME.POST,
  initialState: initialState,
  reducers: {
    onEditPostStart: (state, { payload }: PayloadAction<string>) => {
      state.editingId = payload
    },
    onEditPostEnd: state => {
      state.editingId = undefined
    },
    saveDraftPost: (state, { payload }: PayloadAction<Partial<Post>>) => {
      state.draftPost = payload
    },
    clearDraftPost: state => {
      state.draftPost = undefined
    }
  }
})

const postReducer = post.reducer

export default postReducer

export const { onEditPostStart, onEditPostEnd, saveDraftPost, clearDraftPost } = post.actions
