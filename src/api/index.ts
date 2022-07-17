import axios, { AxiosResponse } from 'axios';

// TODO: url should be taken from some property depends on env
const HOST_URL = 'http://localhost:8080';

export const chatApi = {
  async getAllChats(page: number, size: number): Promise<AxiosResponse<Chat[]>> {
    return axios.get<Chat[]>(`${HOST_URL}/chats`, {
      params: {
        page: page || 1,
        size: size || 15,
      },
    });
  },
};

export const messageApi = {
  getMessagesFromChat(
    chatId: number,
    page: number,
    size: number,
  ): Promise<AxiosResponse<Message[]>> {
    return axios.get<Message[]>(`${HOST_URL}/messages`, {
      params: {
        chatId,
        page: page || 1,
        size: size || 25,
      },
    });
  },
};
