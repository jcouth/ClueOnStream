import { api } from './client';

const { REACT_APP_TWITCH_CLIENT_ID, REACT_APP_TWITCH_LOGIN_URL } = process.env;

interface ValidToken {
  client_id: string;
  login: string;
  scopes: string[];
  user_id: string;
  expires_in: number;
}

export const check = async (token: string) => {
  return await api.get<ValidToken>(`/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: REACT_APP_TWITCH_LOGIN_URL,
    transformRequest: [
      (data, headers) => {
        if (headers) {
          delete headers['Client-ID'];
        }

        return data;
      },
    ],
  });
};

export const revoke = async (token: string) => {
  return await api.post<never>(
    `/revoke`,
    `client_id=${REACT_APP_TWITCH_CLIENT_ID ?? ''}&token=${token}`,
    {
      baseURL: REACT_APP_TWITCH_LOGIN_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [
        (data, headers) => {
          if (headers) {
            delete headers['Client-ID'];
          }

          return data;
        },
      ],
    }
  );
};
