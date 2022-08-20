import { createAsyncThunk } from '@reduxjs/toolkit';
import chatApi from '../../api/chat';
import { getLastMessages } from '../../services/message.service';
import { setMessages } from '../message/slice';

export const getAllChats = createAsyncThunk<Chat[], Pagination>(
  'chat/getAllChats',
  async ({ page, size }, thunkAPI) => {
    const { data } = await chatApi.getAllChats(page, size);

    const lastMessages = getLastMessages(data);

    thunkAPI.dispatch(setMessages(lastMessages));

    return data;
  },
);
