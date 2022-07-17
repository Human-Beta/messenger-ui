import { Status } from '../types';

export type MessageState = {
  messages: Message[];
  status: Status;
};

export type GetMessagesParams = Pagination & {
  chatId: number;
};
