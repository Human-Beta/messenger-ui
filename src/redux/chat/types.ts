import { Status } from '../../@types/status';

export interface ChatState {
  chats: Chat[];
  status: Status;
  selectedChat: Chat | null;
}
