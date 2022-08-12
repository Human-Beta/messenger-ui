import { Status } from '../../@types/status';

export type MessageState = {
  messages: { [key: number]: Message[] };
  // TODO: change to the map of messagesStatus
  messagesStatus: Status;
};

export type GetMessagesParams = Pagination & {
  chatId: number;
};
