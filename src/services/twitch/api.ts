import { api } from './client';

export const fetchUser = async (token: string) => {
  return await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
