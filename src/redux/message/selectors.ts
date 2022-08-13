import { RootState } from '../store';

export const getMessages = (state: RootState): { [key: number]: Message[] } =>
  state.message.messages;

export const getChatMessages = (state: RootState): Message[] =>
  state.message.messages[state.chat.selectedChat!.id];

export const getLastMessage =
  (chatId: number) =>
  (state: RootState): Message => {
    const lastIndex = state.message.messages[chatId].length - 1;
    return state.message.messages[chatId][lastIndex];
  };
