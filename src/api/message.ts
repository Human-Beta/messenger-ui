import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const messageApi = {
  getMessagesFromChat(
    chatId: number,
    page: number,
    size: number,
  ): Promise<AxiosResponse<Message[]>> {
    return axios.get<Message[]>('/messages', {
      params: {
        chatId,
        page: page || 1,
        size: size || 25,
      },
    });
  },

  sendMessage(messageRequest: MessageRequest): Promise<AxiosResponse<Message>> {
    return axios.post<Message>('/messages', messageRequest);
  },
};

export default messageApi;
