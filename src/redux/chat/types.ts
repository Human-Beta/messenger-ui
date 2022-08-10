import { Status } from '../../@types/status';

export type ChatState = {
  chats: Chat[];
  status: Status;
  selectedChat: Chat | null;
};
