import React, { useState } from 'react';

import { useLocation } from 'react-router';

import Board from '../../components/Board';
import Info from '../../components/Info';
import Cam from '../../components/Cam';

import { ClueProps } from '../../interfaces/Clue';
import { Team } from '../../interfaces/Card';

import * as S from './styles';

interface Props {
  words: string[];
  seconds: number;
}

const InGame: React.FC<Props> = () => {
  const { state } = useLocation();
  const { words } = state as Props; // Read values passed on state

  const [team, setTeam] = useState<Team>(Team.RED);
  const [clue, setClue] = useState<ClueProps | null>(null);
  const [isStreamerTurn, setIsStreamerTurn] = useState<boolean>(true);

  const handleSendClue = (description: string, amount: number) => {
    setClue({
      description,
      amount,
    });
    setIsStreamerTurn(false);
  };

  const handleOnFinishTurn = (isGameOver: boolean) => {
    setIsStreamerTurn(true);
    setClue(null);
    setTeam((oldState) => (oldState === Team.RED ? Team.BLUE : Team.RED));
  };

  return (
    <S.Container team={team}>
      <S.Aside>
        <Info />
        <Cam
          isStreamerTurn={isStreamerTurn}
          team={team}
          onSend={handleSendClue}
        />
      </S.Aside>
      <S.Main>
        <Board
          team={team}
          clue={clue}
          words={words}
          onFinishTurn={handleOnFinishTurn}
        />
      </S.Main>
    </S.Container>
  );
};

export default InGame;
