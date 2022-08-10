import { Status } from '../../@types/status';

export type MessageState = {
  messages: Message[];
  messagesStatus: Status;
};

export type GetMessagesParams = Pagination & {
  chatId: number;
};
