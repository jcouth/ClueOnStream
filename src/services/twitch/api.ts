import axios, { AxiosResponse } from 'axios';

import { Prediction, Users } from 'interfaces/TwitchResponse';

import { api } from './client';

const { REACT_APP_TWITCH_CLIENT_ID } = process.env;

export const fetchUser = async (token: string) => {
  return await api.get<{ data: Users[] }>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

interface PredictionResponse {
  data: Prediction[];
}

export const makePrediction = async (
  token: string,
  data: {
    id: Prediction['broadcaster_id'];
    title: Prediction['title'];
    outcomes: Array<
      Pick<Prediction['outcomes'][0], 'id'> &
        Pick<Prediction['outcomes'][0], 'title'> &
        Pick<Prediction['outcomes'][0], 'color'>
    >;
    prediction_window: Prediction['prediction_window'];
  }
) => {
  return await api.post<PredictionResponse>(
    '/predictions',
    {
      broadcaster_id: data.id,
      title: data.title,
      outcomes: data.outcomes,
      prediction_window: data.prediction_window,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrediction = async (
  token: string,
  id: Prediction['broadcaster_id']
) => {
  return await api.get<PredictionResponse>(
    `/predictions?broadcaster_id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const finishPrediction = async (
  token: string,
  data: {
    id: Prediction['broadcaster_id'];
    winning_outcome_id: 'red_team' | 'blue_team';
  }
) => {
  return await api.patch<
    PredictionResponse,
    AxiosResponse<PredictionResponse>,
    {
      broadcaster_id: Prediction['broadcaster_id'];
      status: Prediction['status'];
      winning_outcome_id: 'red_team' | 'blue_team';
    }
  >(
    '/predictions',
    {
      broadcaster_id: data.id,
      status: 'RESOLVED',
      winning_outcome_id: data.winning_outcome_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
