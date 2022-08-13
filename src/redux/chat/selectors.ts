import { RootState } from '../store';

export const getChats = (state: RootState) => state.chat.chats;

export const getSelectedChat = (state: RootState) => state.chat.selectedChat;

export const getChatsStatus = (state: RootState) => state.chat.status;
