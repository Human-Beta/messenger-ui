import config from '../config';

export const getAccessToken = () => localStorage.getItem(config.ACCESS_TOKEN_KEY);

export const setAccessToken = (token: string) => localStorage.setItem(config.ACCESS_TOKEN_KEY, token);

export const removeAccessToken = () => localStorage.removeItem(config.ACCESS_TOKEN_KEY);
