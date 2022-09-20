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

export const fetchConjugations = () => {
  return api.get<string[]>('/conjugações');
};

export const fetchDicio = () => {
  return api.get<string[]>('/dicio');
};

export const fetchWords = () => {
  return api.get<string[]>('/palavras');
};

export const fetchVerbs = () => {
  return api.get<string[]>('/verbos');
};
