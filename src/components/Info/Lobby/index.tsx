import React, { useState } from 'react';

import { ReactComponent as AlarmIcon } from '@assets/alarm.svg';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { Status } from '@interfaces/Status';

import { Button, ButtonText, Title } from '../../Cam/styles';

import * as S from './styles';

const OPTIONS = [30, 60, 90, 120, 150];

export interface LobbyProps {
  type: Status;
  username: string;
  onChangeSeconds(seconds: number): void;
}

const Lobby: React.FC<LobbyProps> = ({ type, username, onChangeSeconds }) => {
  const [option, setOption] = useState<number>(90);
  const [expand, setExpand] = useState<boolean>(false);

  const handleOption = (value: number) => {
    setOption(value);
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
        <S.Title>{username || 'Faça login'}</S.Title>
        <S.Status>{type}</S.Status>
        <S.Timer expand={expand}>
          <S.Selector expand={expand} height={70}>
            <Title>Segundos por turno:</Title>
            <S.SelectorContent columns={OPTIONS.length}>
              {OPTIONS.map((value) => (
                <Button
                  key={value}
                  variant="tertiary"
                  onClick={() => handleOption(value)}
                >
                  <ButtonText>{value}</ButtonText>
                </Button>
              ))}
            </S.SelectorContent>
          </S.Selector>
          <S.TimerContent>
            <AlarmIcon width="100%" height="36px" />
            <Button variant="primary" isActive onClick={handleExpand}>
              <ButtonText>{option} segundos</ButtonText>
            </Button>
          </S.TimerContent>
        </S.Timer>
      </S.Content>
    </S.Container>
  );
};

export default Lobby;
