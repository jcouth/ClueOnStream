import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as AlarmIcon } from '../../assets/alarm.svg';

import { ClueProps } from '../../interfaces/Clue';
import { Team } from '../../interfaces/Card';

import * as S from './styles';

type RemainingProps = { [key in Team]: number };

interface HistoryClueProps extends ClueProps {
  team: Team;
}

export interface HistoryProps {
  remaining: RemainingProps;
  clues: HistoryClueProps[];
}

interface Props {
  isStreamerTurn: boolean;
  team: Team;
  history: HistoryProps;
  onFinishTimer(): void;
}

const SECONDS = 5;
const INTERVAL = 100;

// (100% * interval-in-ms) / (seconds-in-ms)
const PROGRESS_DECAY = (100 * INTERVAL) / (SECONDS * 1000);

const Info: React.FC<Props> = ({
  isStreamerTurn,
  team,
  history,
  onFinishTimer,
}) => {
  const progressRef = useRef<NodeJS.Timer>();

  const [progress, setProgress] = useState<number>(100);

  const startTimer = useCallback(() => {
    if (!isStreamerTurn) {
      progressRef.current = setInterval(
        () => setProgress((oldState) => oldState - PROGRESS_DECAY),
        INTERVAL
      );
    }
  }, [isStreamerTurn]);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);
      setProgress(100);
      onFinishTimer();
    }
  }, [progress]);

  return (
    <S.Container>
      <S.Content>
        <S.Team team='red'>
          <S.TeamTitle>Vermelho</S.TeamTitle>
          <S.TeamAmount>{history.remaining.red}</S.TeamAmount>
        </S.Team>
        <S.Team team='blue'>
          <S.TeamTitle>Azul</S.TeamTitle>
          <S.TeamAmount>{history.remaining.blue}</S.TeamAmount>
        </S.Team>
        <S.History>
          <S.HistoryTitle>Histórico de Dicas</S.HistoryTitle>
          <S.HistoryClues>
            <S.HistoryCluesContent>
              {history.clues.map((clue) => (
                <S.Clue
                  key={`${clue.description}${clue.amount}${
                    history.remaining[clue.team]
                  }`}
                >
                  <S.ClueTitle team={clue.team}>{clue.description}</S.ClueTitle>
                  <S.ClueAmount team={clue.team}>{clue.amount}</S.ClueAmount>
                </S.Clue>
              ))}
            </S.HistoryCluesContent>
          </S.HistoryClues>
        </S.History>
        <S.Timer>
          <S.TimerIcon isStreamerTurn={isStreamerTurn} team={team}>
            <AlarmIcon />
          </S.TimerIcon>
          <S.Progress
            isStreamerTurn={isStreamerTurn}
            team={team}
            progress={progress}
            interval={`${INTERVAL / 1000}s`}
          />
        </S.Timer>
      </S.Content>
    </S.Container>
  );
};

export default Info;
