import React, { useState } from 'react';

import { useLocation } from 'react-router';

import Info, { HistoryProps } from '@components/Info';
import Board from '@components/Board';
import Cam from '@components/Cam';
import { ClueProps } from '@interfaces/Clue';
import { Status } from '@interfaces/Status';
import { Team } from '@interfaces/Card';

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
  const [winner, setWinner] = useState<Team | null>(null);
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
    let {
      remaining: { red, blue },
    } = history;
    const nextTeam = team === Team.RED ? Team.BLUE : Team.RED;

    if (team === Team.RED) {
      red -= cardsOpened;
      blue -= openedOtherTeam;
    } else {
      red -= openedOtherTeam;
      blue -= cardsOpened;
    }

    if (isGameOver) {
      setWinner(nextTeam);
      setTeam(nextTeam);
    } else if (red === 0) {
      setWinner(Team.RED);
    } else if (blue === 0) {
      setWinner(Team.BLUE);
    } else {
      setTeam(nextTeam);
    }

    setHistory((oldState) => ({
      remaining: {
        red,
        blue,
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
  };

  return (
    <S.Container>
      <S.Content team={team}>
        <S.Aside>
          <Info
            isStreamerTurn={isStreamerTurn}
            team={team}
            history={history}
            type={Status.WAITING_CONNECTION}
            username="JCOUTH"
            onFinishTimer={handleOnFinishTimer}
            onChangeSeconds={(_) => {}}
          />
          <Cam
            type={Status.WAITING_CONNECTION}
            isStreamerTurn={isStreamerTurn}
            onSend={handleSendClue}
          />
        </S.Aside>
        <S.Main>
          <Board
            winner={winner}
            amountOfRedCards={AMOUNT_OF_RED_CARDS}
            amountOfBlueCards={AMOUNT_OF_BLUE_CARDS}
            team={team}
            clue={clue}
            words={words}
            isTimerRunning={isTimerRunning}
            onFinishTurn={handleOnFinishTurn}
          />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
