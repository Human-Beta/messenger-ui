import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { createMessage } from '../../services/message.service';
import { getMessagesFromChat, sendMessage } from './asyncActions';
import { MessageState } from './types';

const initialState: MessageState = {
  messages: {},
  messagesStatuses: {},
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      const message: Message = action.payload;

      state.messages[message.chatId].push(message);
    },
  },
  extraReducers(builder) {
    // --- getMessages ---

    builder.addCase(getMessagesFromChat.pending, (state, action) => {
      state.messagesStatuses[action.meta.arg.chatId] = Status.LOADING;
    });

    builder.addCase(getMessagesFromChat.fulfilled, (state, action) => {
      state.messagesStatuses[action.meta.arg.chatId] = Status.SUCCESS;
      state.messages[action.meta.arg.chatId] = action.payload.reverse();
    });

    builder.addCase(getMessagesFromChat.rejected, (state, action) => {
      state.messagesStatuses[action.meta.arg.chatId] = Status.ERROR;
      // TODO: what should be here when an error?
    });

    // --- sendMessage ---

    builder.addCase(sendMessage.pending, (state, action) => {
      const newMessage = createMessage(action.meta.arg);

      state.messages[action.meta.arg.chatId].push(newMessage);
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const receivedMessage = action.payload;

      const message = state.messages[action.meta.arg.chatId].find(
        // TODO: maybe do not use localId == new Date(), but just action.meta.requestId instead
        // and do not send localId to the server
        (msg) => msg.localId === action.meta.arg.localId,
      );

      if (message) {
        message.id = receivedMessage.id;
        message.date = receivedMessage.date;
        message.status = Status.SUCCESS;
      } else {
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

export const { addMessage, setMessages } = messageSlice.actions;

export default messageSlice.reducer;
