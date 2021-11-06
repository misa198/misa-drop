import axios, { AxiosResponse } from 'axios';
import { DEFAULT_API_URL } from '../constants/api';

export const apiAxios = axios.create({
  baseURL: DEFAULT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiAxios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },

  function (error) {
    return Promise.reject(error);
  },
);
