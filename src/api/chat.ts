import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const chatApi = {
  async getAllChats(page: number, size: number): Promise<AxiosResponse<Chat[]>> {
    return axios.get<Chat[]>('/chats', {
      params: {
        page: page || 1,
        size: size || 15,
      },
    });
  },
};

export default chatApi;
