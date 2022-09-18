import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import { getInitChats, getNextChats } from './asyncActions';
import { ChatState } from './types';

const initialState: ChatState = {
  chats: [],
  initStatus: Status.LOADING,
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
      action.payload.forEach((chat) => {
        if (!state.chats.find((c) => c.id === chat.id)) {
          state.chats.push(chat);
        }
      });

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

export const { setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
