import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { createMessage } from '../../services/message.service';
import { getMessagesFromChat, sendMessage } from './asyncActions';
import { MessageState } from './types';

const initialState: MessageState = {
  messages: {},
  messagesStatus: Status.LOADING,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
  extraReducers(builder) {
    // --- getMessages ---

    builder.addCase(getMessagesFromChat.pending, (state) => {
      state.messagesStatus = Status.LOADING;
    });

    builder.addCase(getMessagesFromChat.fulfilled, (state, action) => {
      state.messagesStatus = Status.SUCCESS;
      state.messages[action.meta.arg.chatId] = action.payload.reverse();
    });

    builder.addCase(getMessagesFromChat.rejected, (state) => {
      state.messagesStatus = Status.ERROR;
      // TODO: what should be here?
      // state.messages = [];
    });

    // --- sendMessage ---

    builder.addCase(sendMessage.pending, (state, action) => {
      const newMessage = createMessage(action.meta.arg);

      state.messages[action.meta.arg.chatId].push(newMessage);
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const receivedMessage = action.payload;
      // TODO: use map instead? state.messages[action.meta.arg.localId]
      const message = state.messages[action.meta.arg.chatId].find(
        (msg) => msg.localId === action.meta.arg.localId,
      );

      if (message) {
        message.id = receivedMessage.id;
        message.date = receivedMessage.date;
        message.status = Status.SUCCESS;
      } else {
        // TODO: error? or:
        // message!.id = receivedMessage.id;
        // message!.date = receivedMessage.date;
        // message!.status = Status.SUCCESS;
        // TODO: logger
        console.log(`there is no message for id ${action.meta.arg.chatId}`);
      }
    });

    builder.addCase(sendMessage.rejected, (state, action) => {
      const message = state.messages[action.meta.arg.chatId].find(
        (msg) => msg.localId === action.meta.arg.localId,
      );

      if (message) {
        message.status = Status.ERROR;
      } else {
        // TODO: error?
        // TODO: logger
        console.log(`there is no message for id ${action.meta.arg.chatId}`);
      }
    });
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
