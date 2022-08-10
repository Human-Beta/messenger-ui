import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { createMessage } from '../../services/message.service';
import { getMessagesFromChat, sendMessage } from './asyncActions';
import { MessageState } from './types';

const initialState: MessageState = {
  messages: [],
  messagesStatus: Status.LOADING,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // --- getMessages ---

    builder.addCase(getMessagesFromChat.pending, (state) => {
      state.messagesStatus = Status.LOADING;
      state.messages = [];
    });

    builder.addCase(getMessagesFromChat.fulfilled, (state, action) => {
      state.messagesStatus = Status.SUCCESS;
      state.messages = action.payload.reverse();
    });

    builder.addCase(getMessagesFromChat.rejected, (state) => {
      state.messagesStatus = Status.ERROR;
      state.messages = [];
    });

    // --- sendMessage ---

    builder.addCase(sendMessage.pending, (state, action) => {
      const newMessage = createMessage(action.meta.arg);

      state.messages.push(newMessage);
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const receivedMessage = action.payload;
      const message = state.messages.find((msg) => msg.localId === action.meta.arg.localId);

      if (message) {
        message.id = receivedMessage.id;
        message.date = receivedMessage.date;
        message.status = Status.SUCCESS;
      } else {
        // TODO: error?
      }
    });

    builder.addCase(sendMessage.rejected, (state, action) => {
      const message = state.messages.find((msg) => msg.localId === action.meta.arg.localId);

      if (message) {
        message.status = Status.ERROR;
      } else {
        // TODO: error?
      }
    });
  },
});

export default messageSlice.reducer;
