import { Status } from '../../@types/status';
import messageUtils from '../../utils/message.utils';
import { RootState } from '../store';

export const getMessages = (state: RootState): { [key: number]: Message[] } =>
  state.message.messages;

export const getChatMessages = (state: RootState): Message[] =>
  state.message.messages[state.chat.selectedChat!.id];

export const getLastMessage =
  (chatId: number) =>
  (state: RootState): Message =>
    messageUtils.getLastMessage(state.message.messages[chatId]);

export const getInitMessagesStatusForChat = (state: RootState): Status =>
  state.message.initMessagesStatuses[state.chat.selectedChat!.id];
