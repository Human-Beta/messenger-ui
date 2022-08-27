import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import { Auth, UserCred } from './types';

export const getToken = createAsyncThunk<Auth, UserCred>(
  'auth/getToken',
  async ({ nickname, password }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.getToken(nickname, password);

      return data;
    } catch (err: any) {
      return rejectWithValue({ ...err.response.data, status: err.response.status });
    }
  },
);
