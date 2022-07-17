import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types';
import { getMessagesFromChat } from './asyncActions';
import { MessageState } from './types';

const initialState: MessageState = {
  messages: [],
  status: Status.LOADING,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMessagesFromChat.pending, (state) => {
      state.status = Status.LOADING;
      state.messages = [];
    });

    builder.addCase(getMessagesFromChat.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.messages = action.payload;
    });

    builder.addCase(getMessagesFromChat.rejected, (state) => {
      state.status = Status.ERROR;
      state.messages = [];
    });
  },
});

export default messageSlice.reducer;
