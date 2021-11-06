import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../../services/ip.service';

export const fetchIpToken = createAsyncThunk<string>(
  'user/fetch-ip-token',
  async () => {
    const res = await getToken();
    return res.token;
  },
);
