import React, { createContext, useContext, useMemo, useState } from 'react';

import { ChatUserstate, Client as ClientTMI } from 'tmi.js';

import { HistoryProps } from 'components/Info';
import { ClueProps } from 'interfaces/Clue';
import { Status } from 'interfaces/Status';
import { Team } from 'interfaces/Card';

interface States {
  status: Status;
  team: Team;
  seconds: number;
  clue: ClueProps | null;
  winner: Team | null;
  isStreamerTurn: boolean;
  isTimerRunning: boolean;
  history: HistoryProps;
}

interface StateActions extends States {
  handleStatus: React.Dispatch<React.SetStateAction<States['status']>>;
  handleTeam: React.Dispatch<React.SetStateAction<States['team']>>;
  handleSeconds: React.Dispatch<React.SetStateAction<States['seconds']>>;
  handleClue: React.Dispatch<React.SetStateAction<States['clue']>>;
  handleWinner: React.Dispatch<React.SetStateAction<States['winner']>>;
  handleIsStreamerTurn: React.Dispatch<
    React.SetStateAction<States['isStreamerTurn']>
  >;
  handleIsTimerRunning: React.Dispatch<
    React.SetStateAction<States['isTimerRunning']>
  >;
  handleHistory: React.Dispatch<React.SetStateAction<States['history']>>;
}

export type OnMessageCallback = (
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean
) => void;

interface GameContextData extends StateActions {
  amount: {
    red: number;
    blue: number;
    max: number;
  };
  client: ClientTMI | null;
  reset: () => void;
  initClient: (username: string) => void;
  resetClient: () => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const GameContext = createContext<GameContextData>({} as GameContextData);

const AMOUNT_OF_RED_CARDS = 9;
const AMOUNT_OF_BLUE_CARDS = 8;
const MAX_CARDS = 25;

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<ClientTMI | null>(null);

  const [team, setTeam] = useState<Team>(Team.RED);
  const [seconds, setSeconds] = useState<number>(60);
  const [winner, setWinner] = useState<Team | null>(null);
  const [clue, setClue] = useState<ClueProps | null>(null);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(Status.WAITING_CONNECTION);
  const [history, setHistory] = useState<HistoryProps>({
    remaining: {
      red: AMOUNT_OF_RED_CARDS,
      blue: AMOUNT_OF_BLUE_CARDS,
    },
    clues: [],
  });

  const reset = () => {
    setTeam(Team.RED);
    setWinner(null);
    setClue(null);
    setIsStreamerTurn(true);
    setIsTimerRunning(false);
    setHistory({
      remaining: {
        red: AMOUNT_OF_RED_CARDS,
        blue: AMOUNT_OF_BLUE_CARDS,
      },
      clues: [],
    });
  };

  const initClient = async (username: string) => {
    if (client === null) {
      try {
        const _client = new ClientTMI({
          channels: [username],
        });
        await _client.connect();
        setClient(_client);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resetClient = async () => {
    if (client) {
      try {
        client.removeAllListeners();
        await client.disconnect();
        setClient(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const provider = useMemo(
    () => ({
      amount: {
        red: AMOUNT_OF_RED_CARDS,
        blue: AMOUNT_OF_BLUE_CARDS,
        max: MAX_CARDS,
      },
      client,
      status,
      team,
      seconds,
      clue,
      winner,
      isStreamerTurn,
      isTimerRunning,
      history,
      handleStatus: setStatus,
      handleTeam: setTeam,
      handleSeconds: setSeconds,
      handleClue: setClue,
      handleWinner: setWinner,
      handleIsStreamerTurn: setIsStreamerTurn,
      handleIsTimerRunning: setIsTimerRunning,
      handleHistory: setHistory,
      reset,
      initClient,
      resetClient,
    }),
    [
      setClient,
      setStatus,
      setTeam,
      setSeconds,
      setClue,
      setWinner,
      setIsStreamerTurn,
      setIsTimerRunning,
      setHistory,
      reset,
      initClient,
      resetClient,
    ]
  );

  return (
    <GameContext.Provider value={provider}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within an GameProvider');
  }

  return context;
};
