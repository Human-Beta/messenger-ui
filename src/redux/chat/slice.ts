import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChatState = {
  selectedChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<Chat | null>) {
      state.selectedChat = action.payload;
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
