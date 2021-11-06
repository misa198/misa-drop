import { apiAxios } from './instances';

export interface IpResponse {
  token: string;
}

export const getToken = async (): Promise<IpResponse> => {
  return apiAxios.get('/get-token');
};
