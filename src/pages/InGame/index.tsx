import React, { useState } from 'react';

import { useLocation } from 'react-router';

import Board from '../../components/Board';
import Info, { HistoryProps } from '../../components/Info';
import Cam from '../../components/Cam';

import { ClueProps } from '../../interfaces/Clue';
import { Team } from '../../interfaces/Card';

import * as S from './styles';

interface Props {
  words: string[];
  seconds: number;
}

const AMOUNT_OF_RED_CARDS = 9;
const AMOUNT_OF_BLUE_CARDS = 8;

const InGame: React.FC<Props> = () => {
  const { state } = useLocation();
  const { words } = state as Props; // Read values passed on state

  const [team, setTeam] = useState<Team>(Team.RED);
  const [clue, setClue] = useState<ClueProps | null>(null);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryProps>({
    remaining: {
      red: AMOUNT_OF_RED_CARDS,
      blue: AMOUNT_OF_BLUE_CARDS,
    },
    clues: [],
  });

  const handleSendClue = (description: string, amount: number) => {
    setClue({
      description,
      amount,
    });
    setIsStreamerTurn(false);
    setIsTimerRunning(true);
  };

  const handleOnFinishTimer = () => {
    setIsTimerRunning(false);
  };

  const handleOnFinishTurn = (
    cardsOpened: number,
    openedOtherTeam: number,
    isGameOver: boolean
  ) => {
    setIsStreamerTurn(true);
    setHistory((oldState) => ({
      remaining: {
        red:
          team === Team.RED
            ? oldState.remaining.red - cardsOpened
            : oldState.remaining.red - openedOtherTeam,
        blue:
          team === Team.BLUE
            ? oldState.remaining.blue - cardsOpened
            : oldState.remaining.blue - openedOtherTeam,
      },
      clues: [
        ...oldState.clues,
        {
          team,
          description: clue!.description,
          amount: clue!.amount,
        },
      ],
    }));
    setClue(null);
    setTeam((oldState) => (oldState === Team.RED ? Team.BLUE : Team.RED));
  };

  return (
    <S.Container team={team}>
      <S.Aside>
        <Info
          isStreamerTurn={isStreamerTurn}
          team={team}
          history={history}
          onFinishTimer={handleOnFinishTimer}
        />
        <Cam
          isStreamerTurn={isStreamerTurn}
          team={team}
          onSend={handleSendClue}
        />
      </S.Aside>
      <S.Main>
        <Board
          amountOfRedCards={AMOUNT_OF_RED_CARDS}
          amountOfBlueCards={AMOUNT_OF_BLUE_CARDS}
          team={team}
          clue={clue}
          words={words}
          isTimerRunning={isTimerRunning}
          onFinishTurn={handleOnFinishTurn}
        />
      </S.Main>
    </S.Container>
  );
};

export default InGame;
