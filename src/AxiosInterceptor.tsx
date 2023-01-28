import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';
import { LOGOUT_USER_ACTION, useAppDispatch } from './redux/store';
import { getAccessToken } from './services/localStorage.service';

const instance = axios.create({
  // TODO: url should be taken from some property depends on env
  baseURL: config.local.HOST_URL,
});

export const AxiosInterceptor: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isConfigured, setConfigured] = useState(false);

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((request) => {
      const accessToken = getAccessToken();

      if (!request.headers?.Authorization) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return request;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        if (error.response.status === 401) {
          dispatch(LOGOUT_USER_ACTION);
          navigate('/login');
        }

        return Promise.reject(error);
      },
    );

    setConfigured(true);
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <>{isConfigured && children}</>;
};

export default instance;
