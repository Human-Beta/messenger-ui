import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api';
import { Auth, UserCred } from './types';

export const getToken = createAsyncThunk<Auth, UserCred>(
  'auth/getToken',
  async ({ nickname, password }) => {
    const { data } = await authApi.getToken(nickname, password);

    return data;
  },
);
