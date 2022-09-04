import { Status } from '../../@types/status';

export interface MessageState {
  messages: { [key: number]: Message[] };
  initMessagesStatuses: { [key: number]: Status };
}

export interface GetMessagesParams extends Pagination {
  chatId: number;
}
