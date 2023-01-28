import { Status } from '../../@types/status';

export interface MessageState {
  messages: { [key: number]: Message[] };
  initMessagesStatuses: { [key: number]: Status };
  messagesStatuses: { [key: number]: Status };
}

export interface GetMessagesParams {
  chatId: number;
  size: number;
}
