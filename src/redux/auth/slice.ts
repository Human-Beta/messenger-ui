import { createSlice } from '@reduxjs/toolkit';
import { setAccessToken } from '../../services/localStorage.service';
import { getToken } from './asyncActions';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getToken.fulfilled, (_, action) => {
      setAccessToken(action.payload.access_token);
    });
  },
});

export default authSlice.reducer;
