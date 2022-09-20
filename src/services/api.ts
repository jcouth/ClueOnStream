import { CardStatus } from '../components/Card';
import { Cards } from '../interfaces/Cards';
import { api } from './client';

api.interceptors.response.use(
  ({ data, ...rest }) => {
    const newData: Cards[] = (data as string)
      .split('\n')
      .map((item, index) => ({
        id: index,
        title: item,
        status: CardStatus.UNOPEN,
      }));

    return {
      ...rest,
      data: newData,
    };
  },
  (error) => error
);

export const fetchConjugations = () => {
  return api.get<Cards[]>('/conjugações');
};

export const fetchDicio = () => {
  return api.get<Cards[]>('/dicio');
};

export const fetchWords = () => {
  return api.get<Cards[]>('/palavras');
};

export const fetchVerbs = () => {
  return api.get<Cards[]>('/verbos');
};
