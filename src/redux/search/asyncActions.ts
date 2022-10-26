import { createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import chatApi from '../../api/chat';
import userApi from '../../api/user';
import { getLastMessages } from '../../services/message.service';
import { getNonExistingElements } from '../../utils/array.utils';
import { addChats } from '../chat/slice';
import { setMessages } from '../message/slice';
import { RootState } from '../store';
import { FindChatsParams, FindUnknownUsersParams } from './types';

const findChats = async ({ name, size }: FindChatsParams, page: number, thunkAPI: any) => {
  const state = thunkAPI.getState() as RootState;

  const { data: chats } = await chatApi.getChatsWithNameStartsWith(name, page, size);

  const newChats = getNonExistingElements(state.chat.chats, chats, (c1, c2) => c1.id === c2.id);
  const newLastMessages = getLastMessages(newChats);

  // reset already loaded values in the chats. I need to set only new chats and messages for it
  thunkAPI.dispatch(setMessages(newLastMessages));
  thunkAPI.dispatch(addChats(newChats));

  return chats;
};

export const findInitChats = createAsyncThunk<Chat[], FindChatsParams>(
  'search/findInitChats',
  async (params, thunkAPI) => {
    return findChats(params, 1, thunkAPI);
  },
);

export const findNextChats = createAsyncThunk<Chat[], FindChatsParams>(
  'search/findNextChats',
  async (params, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const page = state.search.chats.page;

    return findChats(params, page, thunkAPI);
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;

      if (state.search.chats.status === Status.FULL_LOADED) {
        return false;
      }
    },
  },
);

export const findInitUnknownUsers = createAsyncThunk<User[], FindUnknownUsersParams>(
  'search/findInitUnknownUsers',
  async ({ nickname, size }) => {
    const { data } = await userApi.getUnknownUsers(nickname, 1, size);

    return data;
  },
);

export const findNextUnknownUsers = createAsyncThunk<User[], FindUnknownUsersParams>(
  'search/findNextUnknownUsers',
  async ({ nickname, size }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const page = state.search.unknownUsers.page;

    const { data } = await userApi.getUnknownUsers(nickname, page, size);

    return data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;

      if (state.search.unknownUsers.initStatus === Status.FULL_LOADED) {
        return false;
      }
    },
  },
);
