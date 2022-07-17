import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from '../../api';
import { GetMessagesParams } from './types';

export const getMessagesFromChat = createAsyncThunk<Message[], GetMessagesParams>(
  'message/getMessagesFromChat',
  async ({ chatId, page, size }) => {
    const { data } = await messageApi.getMessagesFromChat(chatId, page, size);

    return data;
  },
);
