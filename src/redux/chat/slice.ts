import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { getAllChats } from './asyncActions';
import { ChatState } from './types';

const initialState: ChatState = {
  chats: [],
  status: Status.LOADING,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<Chat | null>) {
      state.selectedChat = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllChats.pending, (state) => {
      state.status = Status.LOADING;
      state.chats = [];
    });

    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.chats = action.payload;
    });

    builder.addCase(getAllChats.rejected, (state) => {
      state.status = Status.ERROR;
      state.chats = [];
    });
  },
});

export const { setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
