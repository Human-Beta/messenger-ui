import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {} as unknown as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export default userSlice.reducer;
