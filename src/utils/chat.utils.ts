import { NEW_CHAT_ID } from '../redux/chat/slice';

export const isNewChat = (chat: Chat): boolean => chat.id === NEW_CHAT_ID;

export const isNotNewChat = (chat: Chat): boolean => !isNewChat(chat);
