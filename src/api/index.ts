import axios, { AxiosResponse } from 'axios';

export const chatApi = {
  getAllChats: async (page: number, size: number): Promise<AxiosResponse<Chat[]>> => {
    // TODO: url should be taken from some property depends on env
    return axios.get<Chat[]>('http://localhost:8080/chats', {
      params: {
        page: page || 1,
        size: size || 10,
      },
    });
  },
};
