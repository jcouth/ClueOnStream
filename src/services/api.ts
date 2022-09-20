import { api } from './client';

// api.interceptors.response.use(
//   (response) => response,
//   (error) => error
// );

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
