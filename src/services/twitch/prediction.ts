import { AxiosResponse } from 'axios';

import { Prediction } from 'interfaces/TwitchResponse';

import { api } from './client';

interface PredictionResponse {
  data: Prediction[];
}

type PredictionTeamId = 'blue_team' | 'red_team';

export const start = async (
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

export const status = async (
  token: string,
  broadcasterId: Prediction['broadcaster_id'],
  predictionId?: Prediction['id']
) => {
  return await api.get<PredictionResponse>(
    `/predictions?broadcaster_id=${broadcasterId}${
      predictionId ? `&id=${predictionId}` : ''
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const cancel = async (
  token: string,
  broadcasterId: Prediction['broadcaster_id'],
  predictionId: Prediction['id']
) => {
  return await api.patch<
    PredictionResponse,
    AxiosResponse<PredictionResponse>,
    {
      broadcaster_id: Prediction['broadcaster_id'];
      id: Prediction['id'];
      status: Prediction['status'];
    }
  >(
    '/predictions',
    {
      broadcaster_id: broadcasterId,
      id: predictionId,
      status: 'CANCELED',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const resolve = async (
  token: string,
  broadcasterId: Prediction['broadcaster_id'],
  predictionId: Prediction['id'],
  winnerId: PredictionTeamId
) => {
  return await api.patch<
    PredictionResponse,
    AxiosResponse<PredictionResponse>,
    {
      broadcaster_id: Prediction['broadcaster_id'];
      id: Prediction['id'];
      status: Prediction['status'];
      winning_outcome_id: PredictionTeamId;
    }
  >(
    '/predictions',
    {
      broadcaster_id: broadcasterId,
      id: predictionId,
      status: 'RESOLVED',
      winning_outcome_id: winnerId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export interface EndDataProps {
  broadcasterId: Prediction['broadcaster_id'];
  predictionId: Prediction['id'];
  winningOutcomeId?: PredictionTeamId;
}

export const end = async (token: string, data: EndDataProps) => {
  if (data.winningOutcomeId) {
    return await resolve(
      token,
      data.broadcasterId,
      data.predictionId,
      data.winningOutcomeId
    );
  }
  return await cancel(token, data.broadcasterId, data.predictionId);
};
