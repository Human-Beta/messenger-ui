import { Status } from '../../@types/status';
import { isNewChat } from '../../utils/chat.utils';
import messageUtils from '../../utils/message.utils';
import { RootState } from '../store';

export const getMessages = (state: RootState): { [key: number]: Message[] } =>
  state.message.messages;

export const getChatMessages = (state: RootState): Message[] =>
  state.message.messages[state.chat.selectedChat!.id];

export const getLastMessage = (chat: Chat) => {
  if (isNewChat(chat)) {
    return (): Message => chat.initialLastMessage;
  }

  return (state: RootState): Message =>
    messageUtils.getLastMessage(state.message.messages[chat.id]);
};

export const getInitMessagesStatusForSelectedChat = (state: RootState): Status =>
  state.message.initMessagesStatuses[state.chat.selectedChat!.id];

export const getMessagesStatusForSelectedChat = (state: RootState): Status =>
  state.message.messagesStatuses[state.chat.selectedChat!.id];
