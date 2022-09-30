import React, { useState } from 'react';

import { ReactComponent as AlarmIcon } from 'assets/alarm.svg';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Button from 'components/Button';
import { Status } from 'interfaces/Status';

import * as S from './styles';

const OPTIONS = [30, 60, 90, 120, 150];

export interface LobbyProps {
  type: Status;
  username: string | null;
  seconds: number;
  onChangeSeconds: (seconds: number) => void;
}

const Lobby: React.FC<LobbyProps> = ({
  type,
  username,
  seconds,
  onChangeSeconds,
}) => {
  const [expand, setExpand] = useState<boolean>(false);

  const handleOption = (value: number) => {
    setExpand(false);
    onChangeSeconds(value);
  };

  const handleExpand = () => {
    setExpand((oldState) => !oldState);
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <Logo width="100%" height="240px" />
      </S.LogoWrapper>
      <S.Content>
        <S.Title>{username ?? 'Faça login'}</S.Title>
        <S.Status>{type}</S.Status>
        <S.Timer expand={expand}>
          <S.Selector expand={expand} height={70}>
            <S.SelectorTitle>Segundos por turno:</S.SelectorTitle>
            <S.SelectorContent columns={OPTIONS.length}>
              {OPTIONS.map((value) => (
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
            <AlarmIcon width="100%" height="36px" />
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
