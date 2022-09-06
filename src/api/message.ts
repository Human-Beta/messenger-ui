import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const messageApi = {
  getMessagesFromChat(
    chatId: number,
    sinceDate: string,
    size: number,
  ): Promise<AxiosResponse<Message[]>> {
    return axios.get<Message[]>('/messages', {
      params: {
        chatId,
        sinceDate,
        size,
      },
    });
  },

  sendMessage(messageRequest: MessageRequest): Promise<AxiosResponse<Message>> {
    return axios.post<Message>('/messages', messageRequest);
  },
};

export default messageApi;
