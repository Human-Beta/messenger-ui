import { RootState } from '../store';

export const getSelectedChat = (state: RootState) => state.chat.selectedChat;
