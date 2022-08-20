import { AxiosResponse } from 'axios';
import config from '../config';
import { Auth } from '../redux/auth/types';
import axios from '../AxiosInterceptor';

// TODO: separate api files

export const chatApi = {
  async getAllChats(page: number, size: number): Promise<AxiosResponse<Chat[]>> {
    return axios.get<Chat[]>('/chats', {
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

export const authApi = {
  getToken(username: string, password: string): Promise<AxiosResponse<Auth>> {
    return axios.post<Auth>('/oauth/token', null, {
      headers: {
        Authorization: `Basic ${config.local.BASIC_AUTH_HEADER}`,
      },
      params: {
        grant_type: 'password',
        username,
        password,
      },
    });
  },
};

export const userApi = {
  getCurrentUser(): Promise<AxiosResponse<User>> {
    return axios.get('/users/current');
  },
};
