import { api } from './client';

api.interceptors.response.use(
  ({ data, ...rest }) => {
    const newData: string[] = (data as string).split('\n');

    return {
      ...rest,
      data: newData,
    };
  },
  (error) => error
);

export const fetchConjugations = async () => {
  return await api.get<string[]>('/conjugações');
};

export const fetchDicio = async () => {
  return await api.get<string[]>('/dicio');
};

export const fetchWords = async () => {
  return await api.get<string[]>('/palavras');
};

export const fetchVerbs = async () => {
  return await api.get<string[]>('/verbos');
};
