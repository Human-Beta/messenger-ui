import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const chatApi = {
  async getChats(excludeIds: number[], size: number): Promise<AxiosResponse<Chat[]>> {
    return axios.get<Chat[]>('/chats', {
      params: {
        excludeIds: excludeIds.join(','),
        size,
      },
    });
  },
};

export default chatApi;
