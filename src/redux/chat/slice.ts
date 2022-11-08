import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { getNonExistingElements } from '../../utils/array.utils';
import { getInitChats, getNextChats } from './asyncActions';
import { ChatState } from './types';

// TODO: create constants file? put there NEW_CHAT_ID and for example PAGE_SIZE?
export const NEW_CHAT_ID = -1;
export const STUB_MESSAGE_ID = -1;

const stubMessage: Message = {
  id: STUB_MESSAGE_ID,
  senderId: -1,
  chatId: -1,
  value: '<no messages yet>',
  status: Status.SUCCESS,
  date: new Date().toISOString(),
};

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
    addChats(state, action: PayloadAction<Chat[]>) {
      state.chats.push(...action.payload);
    },
    createNewChat(state, action: PayloadAction<User>) {
      const user = action.payload;

      const newChat = {
        id: NEW_CHAT_ID,
        name: user.name,
        chatName: user.nickname,
        imageUrl: user.avatarUrl,
        initialLastMessage: stubMessage,
      };

      state.selectedChat = newChat;
      state.chats.push(newChat);
    },
    deleteNewChat(state) {
      const index = state.chats.findIndex((c) => c.id === NEW_CHAT_ID);
      if (index >= 0) {
        state.selectedChat = null;
        state.chats.splice(index, 1);
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

export const { setSelectedChat, addChats, createNewChat, deleteNewChat } = chatSlice.actions;

export default chatSlice.reducer;
