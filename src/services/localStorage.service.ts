import config from '../config';

export const getAccessToken = () => localStorage.getItem(config.local.ACCESS_TOKEN_KEY);

export const setAccessToken = (token: string) =>
  localStorage.setItem(config.local.ACCESS_TOKEN_KEY, token);

export const removeAccessToken = () => localStorage.removeItem(config.local.ACCESS_TOKEN_KEY);
