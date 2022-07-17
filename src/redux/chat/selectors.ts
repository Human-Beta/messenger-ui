import { RootState } from '../store';

export const getChats = (state: RootState) => state.chat.chats;

export const getSelectedChat = (state: RootState) => state.chat.selectedChat;
