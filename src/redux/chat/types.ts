import { Status } from '../types';

export type ChatState = {
  chats: Chat[];
  status: Status;
  selectedChat: Chat | null;
};
