import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { createMessage } from '../../services/message.service';
import { getInitMessagesFromChat, getNextMessagesFromChat, sendMessage } from './asyncActions';
import { MessageState } from './types';

const initialState: MessageState = {
  messages: {},
  initMessagesStatuses: {},
  messagesStatuses: {},
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = { ...state.messages, ...action.payload };
    },
    addMessage(state, action) {
      const message: Message = action.payload;

      state.messages[message.chatId].unshift(message);
    },
  },
  extraReducers(builder) {
    // --- getInitMessagesFromChat ---

    builder.addCase(getInitMessagesFromChat.pending, (state, action) => {
      state.initMessagesStatuses[action.meta.arg.chatId] = Status.LOADING;
    });

    builder.addCase(getInitMessagesFromChat.fulfilled, (state, action) => {
      state.messages[action.meta.arg.chatId] = action.payload;

      if (action.payload.length < action.meta.arg.size) {
        state.initMessagesStatuses[action.meta.arg.chatId] = Status.FULL_LOADED;
      } else {
        state.initMessagesStatuses[action.meta.arg.chatId] = Status.SUCCESS;
      }
    });

    builder.addCase(getInitMessagesFromChat.rejected, (state, action) => {
      state.initMessagesStatuses[action.meta.arg.chatId] = Status.ERROR;
      // TODO: what should be here when an error?
    });

    // --- getNextMessagesFromChat ---

    builder.addCase(getNextMessagesFromChat.pending, (state, action) => {
      state.messagesStatuses[action.meta.arg.chatId] = Status.LOADING;
    });

    builder.addCase(getNextMessagesFromChat.fulfilled, (state, action) => {
      state.messages[action.meta.arg.chatId].push(...action.payload);

      if (action.payload.length < action.meta.arg.size) {
        state.messagesStatuses[action.meta.arg.chatId] = Status.FULL_LOADED;
      } else {
        state.messagesStatuses[action.meta.arg.chatId] = Status.SUCCESS;
      }
    });

    // --- sendMessage ---

    builder.addCase(sendMessage.pending, (state, action) => {
      const newMessage = createMessage(action.meta.arg, action.meta.requestId);

      state.messages[action.meta.arg.chatId].unshift(newMessage);
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const receivedMessage = action.payload;

      const message = state.messages[action.meta.arg.chatId].find(
        (msg) => msg.localId === action.meta.requestId,
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
        (msg) => msg.localId === action.meta.requestId,
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
