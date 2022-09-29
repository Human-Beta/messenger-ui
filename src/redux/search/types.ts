import { Status } from '../../@types/status';

export interface SearchState {
  searching: boolean;
  by: SearchBy;
  searchValue: string;
  chats: {
    value: Chat[];
    status: Status;
    page: number;
  };
  // TODO: fix
  // messages: {
  //   value: ChatPreview[];
  //   status: Status;
  //   page: number;
  // };
}

export enum SearchBy {
  CHATS = 'chats',
  CHATS_AND_MESSAGES = 'chats_and_messages',
}

export interface FindNextChatsParams {
  name: string;
  size: number;
}
