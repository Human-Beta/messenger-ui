import { RootState } from '../store';

export const getChats = (state: RootState) => state.chat.chats;

export const getSelectedChat = (state: RootState) => state.chat.selectedChat;

export const getChatsInitStatus = (state: RootState) => state.chat.initStatus;

export const getChatsStatus = (state: RootState) => state.chat.status;
