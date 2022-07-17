export type ChatState = {
  chats: Chat[];
  status: Status;
  selectedChat: Chat | null;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
