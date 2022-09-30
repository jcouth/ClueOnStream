import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as AlarmIcon } from 'assets/alarm.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ClueProps } from 'interfaces/Clue';
import { Team } from 'interfaces/Card';

import * as S from './styles';

interface Properties {
  seconds: number;
  interval: number;
  decay: number;
}

type RemainingProps = { [key in Team]: number };

interface HistoryClueProps extends ClueProps {
  team: Team;
}

export interface HistoryProps {
  remaining: RemainingProps;
  clues: HistoryClueProps[];
}

export interface GameProps {
  isStreamerTurn: boolean;
  team: Team;
  history: HistoryProps;
  seconds: number;
  onFinishTimer: () => void;
}

const Game: React.FC<GameProps> = ({
  isStreamerTurn,
  team,
  history,
  seconds,
  onFinishTimer,
}) => {
  const progressRef = useRef<NodeJS.Timer>();

  const [progress, setProgress] = useState<number>(100);
  const [properties, setProperties] = useState<Properties | null>(null);

  const startTimer = useCallback(() => {
    if (!isStreamerTurn && properties) {
      progressRef.current = setInterval(
        () => setProgress((oldState) => oldState - properties.decay),
        properties.interval
      );
    }
  }, [isStreamerTurn, properties]);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const init = useCallback(() => {
    const interval = 100;
    // (100% * interval-in-ms) / (seconds-in-ms)
    const decay = (100 * interval) / (seconds * 1000);

    setProperties({
      seconds,
      interval,
      decay,
    });
  }, [seconds]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(progressRef.current);
      setProgress(100);
      onFinishTimer();
    }
  }, [progress, onFinishTimer]);

  return (
    <S.Container>
      <S.Content>
        <S.Team team={Team.RED}>
          <S.TeamTitle>Vermelho</S.TeamTitle>
          <S.TeamAmount>{history.remaining.red}</S.TeamAmount>
        </S.Team>
        <S.Team team={Team.BLUE}>
          <S.TeamTitle>Azul</S.TeamTitle>
          <S.TeamAmount>{history.remaining.blue}</S.TeamAmount>
        </S.Team>
        <S.History>
          <S.HistoryTitle>Histórico de Dicas</S.HistoryTitle>
          <S.HistoryClues>
            <S.HistoryLogo>
              <Logo width="100%" height="100%" fillOpacity={0.25} />
            </S.HistoryLogo>
            <S.HistoryCluesContent>
              {history.clues.map((clue, index) => (
                <S.Clue
                  key={`${index}${clue.description}${clue.amount}${
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
            interval={properties ? `${properties.interval / 1000}s` : '0s'}
          />
        </S.Timer>
      </S.Content>
    </S.Container>
  );
};

export default Game;
