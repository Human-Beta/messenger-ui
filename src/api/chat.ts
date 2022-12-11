import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const chatApi = {
  async getChats(excludedIds: number[], size: number): Promise<AxiosResponse<Chat[]>> {
    return axios.get<Chat[]>('/chats', {
      params: {
        excludedIds: excludedIds.join(','),
        size,
      },
    });
  },
  async getChatsWithNameStartsWith(
    name: string,
    page: number,
    size: number,
  ): Promise<AxiosResponse<Chat[]>> {
    return axios.get<Chat[]>('/chats/search', {
      params: {
        name,
        page,
        size,
      },
    });
  },
  async createPrivateChat(nickname: string): Promise<AxiosResponse<Chat>> {
    return axios.post<Chat>('/chats/private', null, {
      params: {
        nickname,
      },
    });
  },
};

export default chatApi;
