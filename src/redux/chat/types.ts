import { Status } from '../../@types/status';

export interface ChatState {
  chats: Chat[];
  initStatus: Status;
  status: Status | null;
  selectedChat: Chat | null;
}

export interface GetChatsParams {
  excludeIds?: number[];
  size: number;
}
