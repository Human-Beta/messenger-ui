import { Status } from '../../@types/status';

export type MessageState = {
  messages: { [key: number]: Message[] };
  messagesStatuses: { [key: number]: Status };
};

export type GetMessagesParams = Pagination & {
  chatId: number;
};
