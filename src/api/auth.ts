import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';
import config from '../config';
import { Auth } from '../redux/auth/types';

const authApi = {
  getToken(username: string, password: string): Promise<AxiosResponse<Auth>> {
    return axios.post<Auth>('/oauth/token', null, {
      headers: {
        Authorization: `Basic ${config.BASIC_AUTH_HEADER}`,
      },
      params: {
        grant_type: 'password',
        username,
        password,
      },
    });
  },
};

export default authApi;
