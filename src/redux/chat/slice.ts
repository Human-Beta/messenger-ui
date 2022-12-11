import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { getNonExistingElements } from '../../utils/array.utils';
import { getInitChats, getNextChats } from './asyncActions';
import { ChatState } from './types';

const initialState: ChatState = {
  chats: [],
  initStatus: Status.INITIAL,
  status: null,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<Chat | null>) {
      state.selectedChat = action.payload;
    },
    addChat(state, action: PayloadAction<Chat>) {
      state.chats.push(action.payload);
    },
    addChats(state, action: PayloadAction<Chat[]>) {
      state.chats.push(...action.payload);
    },
    addInitMessage(state, action: PayloadAction<Message>) {
      const message = action.payload;

      const chat = state.chats.find((c) => c.id === message.chatId);

      if (chat) {
        chat.initialLastMessage = message;
      } else {
        console.error(`There is no chat for message: ${message}`);
      }
    },
  },
  extraReducers(builder) {
    // ---- getInitChats ----

    builder.addCase(getInitChats.pending, (state) => {
      state.initStatus = Status.LOADING;
    });

    builder.addCase(getInitChats.fulfilled, (state, action) => {
      state.chats = action.payload;

      if (action.payload.length < action.meta.arg.size) {
        state.initStatus = Status.FULL_LOADED;
      } else {
        state.initStatus = Status.SUCCESS;
      }
    });

    builder.addCase(getInitChats.rejected, (state) => {
      state.initStatus = Status.ERROR;
    });

    // ---- getNextChats ----

    builder.addCase(getNextChats.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(getNextChats.fulfilled, (state, action) => {
      // to prevent the case when the requested chat has been loaded earlier
      const newChats = getNonExistingElements(
        state.chats,
        action.payload,
        (c1, c2) => c1.id === c2.id,
      );

      state.chats.push(...newChats);

      if (action.payload.length < action.meta.arg.size) {
        state.status = Status.FULL_LOADED;
      } else {
        state.status = Status.SUCCESS;
      }
    });

    builder.addCase(getNextChats.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setSelectedChat, addChat, addChats, addInitMessage } = chatSlice.actions;

export default chatSlice.reducer;
