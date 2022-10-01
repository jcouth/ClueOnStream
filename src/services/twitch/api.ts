import axios from 'axios';

import { api } from './client';

const { REACT_APP_TWITCH_CLIENT_ID } = process.env;

export const fetchUser = async (token: string) => {
  return await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logout = async (token: string) => {
  return await axios.post(
    'https://id.twitch.tv/oauth2/revoke',
    `client_id=${REACT_APP_TWITCH_CLIENT_ID ?? ''}&token=${token}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 2000,
    }
  );
};
