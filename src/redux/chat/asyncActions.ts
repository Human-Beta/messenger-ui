import { createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import chatApi from '../../api/chat';
import { getLastMessages } from '../../services/message.service';
import { setMessages } from '../message/slice';
import { RootState } from '../store';
import { GetChatsParams } from './types';

const getChats = async (excludedIds: number[], size: number, thunkAPI: any): Promise<Chat[]> => {
  const { data: chats } = await chatApi.getChats(excludedIds, size);

  const lastMessages = getLastMessages(chats);

  thunkAPI.dispatch(setMessages(lastMessages));

  return chats;
};

export const getInitChats = createAsyncThunk<Chat[], GetChatsParams>(
  'chat/getInitChats',
  async ({ excludedIds = [], size }, thunkAPI) => {
    return getChats(excludedIds, size, thunkAPI);
  },
);

export const getNextChats = createAsyncThunk<Chat[], GetChatsParams>(
  'chats/getNextChats',
  async ({ excludedIds = [], size }, thunkAPI) => {
    return getChats(excludedIds, size, thunkAPI);
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
