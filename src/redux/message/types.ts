import { Status } from '../../@types/status';

export interface MessageState {
  messages: { [key: number]: Message[] };
  messagesStatuses: { [key: number]: Status };
}

export interface GetMessagesParams extends Pagination {
  chatId: number;
}
