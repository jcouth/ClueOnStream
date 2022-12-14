import React, { useState } from 'react';

import AlarmIcon from 'assets/alarm.svg';
import Logo from 'assets/logo.svg';
import Button from 'components/Button';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';

import * as S from './styles';

const SECONDS_OPTIONS = [30, 45, 60, 75, 90];

interface LobbyProps {
  username: string | null;
}

const Lobby: React.FC<LobbyProps> = ({ username }) => {
  const { status, seconds, handleSeconds } = useGame();

  const [expand, setExpand] = useState<boolean>(false);

  const handleOption = (value: number) => {
    setExpand(false);
    handleSeconds(value);
  };

  const handleExpand = () => {
    setExpand((oldState) => !oldState);
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <Logo width="100%" height="15.831vw" />
      </S.LogoWrapper>
      <S.Content>
        <S.Title>{username ?? 'Faça login'}</S.Title>
        <S.Status>
          {status === Status.FINISH_GAME ? Status.WAITING_START : status}
        </S.Status>
        <S.Timer expand={expand}>
          <S.Selector expand={expand} height={4.617}>
            <S.SelectorTitle>Segundos por turno:</S.SelectorTitle>
            <S.SelectorContent columns={SECONDS_OPTIONS.length}>
              {SECONDS_OPTIONS.map((value) => (
                <Button
                  key={value}
                  title={value}
                  variant="tertiary"
                  onClick={() => handleOption(value)}
                />
              ))}
            </S.SelectorContent>
          </S.Selector>
          <S.TimerContent>
            <AlarmIcon width="100%" height="2.375vw" />
            <Button
              title={`${seconds} segundos`}
              variant="primary"
              isActive
              onClick={handleExpand}
            />
          </S.TimerContent>
        </S.Timer>
      </S.Content>
    </S.Container>
  );
};

export default Lobby;
