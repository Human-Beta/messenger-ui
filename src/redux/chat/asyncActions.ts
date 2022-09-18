import { createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import chatApi from '../../api/chat';
import { getLastMessages } from '../../services/message.service';
import { setMessages } from '../message/slice';
import { RootState } from '../store';
import { GetChatsParams } from './types';

export const getInitChats = createAsyncThunk<Chat[], GetChatsParams>(
  'chat/getInitChats',
  async ({ excludeIds = [], size }, thunkAPI) => {
    const { data } = await chatApi.getChats(excludeIds, size);

    const lastMessages = getLastMessages(data);

    thunkAPI.dispatch(setMessages(lastMessages));

    return data;
  },
);

export const getNextChats = createAsyncThunk<Chat[], GetChatsParams>(
  'chats/getNextChats',
  async ({ excludeIds = [], size }, thunkAPI) => {
    const { data } = await chatApi.getChats(excludeIds, size);

    const lastMessages = getLastMessages(data);

    thunkAPI.dispatch(setMessages(lastMessages));

    return data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;

      if (state.chat.status === Status.FULL_LOADED) {
        return false;
      }
    },
  },
);
