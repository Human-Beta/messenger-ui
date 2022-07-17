import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from '../../api';

export const getAllChats = createAsyncThunk<Chat[], Pagination>(
  'chat/getAllChats',
  async ({ page, size }) => {
    const { data } = await chatApi.getAllChats(page, size);

    return data;
  },
);
