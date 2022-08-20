import { AxiosResponse } from 'axios';
import axios from '../AxiosInterceptor';

const userApi = {
  getCurrentUser(): Promise<AxiosResponse<User>> {
    return axios.get('/users/current');
  },
};

export default userApi;
