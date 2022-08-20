import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {
  // TODO: what to set here? The current user is always presented
  currentUser: null,
};

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
