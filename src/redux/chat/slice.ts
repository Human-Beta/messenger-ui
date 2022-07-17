import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Status } from './types';
import { getAllChats } from './asyncActions';

const initialState: ChatState = {
  chats: [],
  status: Status.LOADING,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    setSelectedChat(state, action: PayloadAction<Chat | null>) {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChats.pending, (state) => {
      state.status = Status.LOADING;
      state.chats = [];
    });

    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.chats = action.payload;
    });

    builder.addCase(getAllChats.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.chats = [];
    });
  },
});

export const { setChats, setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
