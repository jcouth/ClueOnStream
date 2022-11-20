import { api } from './client';

import { Users } from 'interfaces/TwitchResponse';

// interceptor 401

// api.interceptors.response

export * as apiPrediction from './prediction';
export * as apiToken from './token';

export const fetchUser = async (token: string) => {
  return await api.get<{ data: Users[] }>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
