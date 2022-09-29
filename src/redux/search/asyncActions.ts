import { createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../../@types/status';
import chatApi from '../../api/chat';
import { getLastMessages } from '../../services/message.service';
import { getNonExistingElements } from '../../utils/array.utils';
import { addChats } from '../chat/slice';
import { setMessages } from '../message/slice';
import { RootState } from '../store';
import { FindNextChatsParams } from './types';

export const findNextChats = createAsyncThunk<Chat[], FindNextChatsParams>(
  'message/findNextChats',
  async ({ name, size }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const page = state.search.chats.page;

    const { data: chats } = await chatApi.getChatsWithNameStartsWith(name, page, size);

    const newChats = getNonExistingElements(state.chat.chats, chats, (c1, c2) => c1.id === c2.id);
    const newLastMessages = getLastMessages(newChats);

    // TODO: resets already loaded values in the chats. I need to set onlye new chats and messages for it
    thunkAPI.dispatch(setMessages(newLastMessages));
    thunkAPI.dispatch(addChats(newChats));

    return chats;
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
