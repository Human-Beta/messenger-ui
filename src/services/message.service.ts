import moment from 'moment';
import { Status } from '../@types/status';

export const createMessageRequest = (
  chatId: number,
  senderId: number,
  value: string,
): MessageRequest => {
  return {
    chatId,
    senderId,
    value,
  };
};

export const createMessage = (
  { senderId, chatId, value }: MessageRequest,
  localId: string,
): Message => {
  return {
    localId,
    senderId,
    chatId,
    value,
    status: Status.LOADING,
    date: moment().toISOString(),
  };
};

export const getLastMessages = (chats: Chat[]) => {
  return chats.reduce<{ [key: number]: Message[] }>((map, chat) => {
    map[chat.id] = [chat.initialLastMessage];
    return map;
  }, {});
};
