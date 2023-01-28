import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';

const initialState: UserState = {
  // TODO: fix it
  currentUser: {
    id: 0,
    nickName: 'killer_sniper',
    name: 'Nikita Shishov',
    avatarUrl: '#',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
