import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api';

export const getCurrentUser = createAsyncThunk<User>('user/getCurrentUser', async () => {
  const { data } = await userApi.getCurrentUser();

  return data;
});
