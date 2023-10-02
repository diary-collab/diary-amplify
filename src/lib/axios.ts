import axios, { AxiosError } from 'axios';

import logger from './logger';

import { UninterceptedApiError } from '@src/types/api';

const env = process.env.NODE_ENV;

const baseURL =
    env === 'production'
      ? process.env.PROD_API_BASE_URL
      : process.env.DEV_API_BASE_URL,
  isServer = typeof window === 'undefined';
logger(isServer);

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
