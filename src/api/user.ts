import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const userApi = {
  getCurrentUser(): Promise<AxiosResponse<User>> {
    return axios.get('/users/current');
  },
  registerUser(userRegistration: UserRegistration): Promise<AxiosResponse<User>> {
    return axios.post('/users', userRegistration);
  },
  getUnknownUsers(nickname: string, page: number, size: number): Promise<AxiosResponse<User[]>> {
    return axios.get('/users/unknown', {
      params: {
        nickname,
        page,
        size,
      },
    });
  },
};

export default userApi;
