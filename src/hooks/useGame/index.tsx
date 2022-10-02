import React, { createContext, useContext, useMemo, useState } from 'react';

import { HistoryProps } from 'components/Info';
import { ClueProps } from 'interfaces/Clue';
import { Status } from 'interfaces/Status';
import { CardProps, Team } from 'interfaces/Card';

interface States {
  cards: CardProps[];
  status: Status;
  team: Team;
  seconds: number;
  clue: ClueProps | null;
  winner: Team | null;
  totalVotes: number;
  isStreamerTurn: boolean;
  isTimerRunning: boolean;
  history: HistoryProps;
}

interface StateActions extends States {
  handleCards: React.Dispatch<React.SetStateAction<States['cards']>>;
  handleStatus: React.Dispatch<React.SetStateAction<States['status']>>;
  handleTeam: React.Dispatch<React.SetStateAction<States['team']>>;
  handleSeconds: React.Dispatch<React.SetStateAction<States['seconds']>>;
  handleClue: React.Dispatch<React.SetStateAction<States['clue']>>;
  handleWinner: React.Dispatch<React.SetStateAction<States['winner']>>;
  handleTotalVotes: React.Dispatch<React.SetStateAction<States['totalVotes']>>;
  handleIsStreamerTurn: React.Dispatch<
    React.SetStateAction<States['isStreamerTurn']>
  >;
  handleIsTimerRunning: React.Dispatch<
    React.SetStateAction<States['isTimerRunning']>
  >;
  handleHistory: React.Dispatch<React.SetStateAction<States['history']>>;
}

interface GameContextData extends StateActions {
  amount: {
    red: number;
    blue: number;
    max: number;
  };
  reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const GameContext = createContext<GameContextData>({} as GameContextData);

const AMOUNT_OF_RED_CARDS = 9;
const AMOUNT_OF_BLUE_CARDS = 8;
const MAX_CARDS = 25;

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [team, setTeam] = useState<Team>(Team.RED);
  const [seconds, setSeconds] = useState<number>(60);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [winner, setWinner] = useState<Team | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);
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
    setCards([]);
    setTeam(Team.RED);
    setClue(null);
    setWinner(null);
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

  const provider = useMemo(
    () => ({
      amount: {
        red: AMOUNT_OF_RED_CARDS,
        blue: AMOUNT_OF_BLUE_CARDS,
        max: MAX_CARDS,
      },
      cards,
      status,
      team,
      seconds,
      clue,
      winner,
      totalVotes,
      isStreamerTurn,
      isTimerRunning,
      history,
      handleCards: setCards,
      handleStatus: setStatus,
      handleTeam: setTeam,
      handleSeconds: setSeconds,
      handleClue: setClue,
      handleWinner: setWinner,
      handleTotalVotes: setTotalVotes,
      handleIsStreamerTurn: setIsStreamerTurn,
      handleIsTimerRunning: setIsTimerRunning,
      handleHistory: setHistory,
      reset,
    }),
    [
      setCards,
      setStatus,
      setTeam,
      setSeconds,
      setClue,
      setWinner,
      setTotalVotes,
      setIsStreamerTurn,
      setIsTimerRunning,
      setHistory,
      reset,
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
