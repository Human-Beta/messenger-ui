import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/user';
import { RegisterUserParams } from './types';

export const registerUser = createAsyncThunk<User, RegisterUserParams>(
  'user/register',
  async (userRegistration, { rejectWithValue }) => {
    try {
      const { data } = await userApi.registerUser(userRegistration);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getCurrentUser = createAsyncThunk<User>('user/getCurrentUser', async () => {
  const { data } = await userApi.getCurrentUser();

  return data;
});
