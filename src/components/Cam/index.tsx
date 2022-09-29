import React from 'react';

import { ReactComponent as TwitchLogo } from '@assets/twitch-logo.svg';
import { ReactComponent as CameraIcon } from '@assets/camera.svg';
import { Status } from '@interfaces/Status';

import * as S from './styles';
import Game from './Game';

interface Props {
  type?: Status;
  isStreamerTurn: boolean;
  onSend(clue: string, amount: number): void;
}

const Cam: React.FC<Props> = ({ type, isStreamerTurn, onSend }) => {
  const handleClick = () => {};

  const renderContent = () => {
    if (type === Status.GAME) {
      return <Game isStreamerTurn={isStreamerTurn} onSend={onSend} />;
    }
    if (type === Status.WAITING_START) {
      return (
        <S.Content>
          <S.Button variant="secondary" isActive onClick={handleClick}>
            <S.ButtonText>Sair</S.ButtonText>
          </S.Button>
          <S.Button variant="primary" isActive onClick={handleClick}>
            <S.ButtonText>Iniciar</S.ButtonText>
          </S.Button>
        </S.Content>
      );
    }
    if (type === Status.WAITING_TEAMS) {
      return (
        <S.Content>
          <S.ContentInfo>
            Espere o chat entrar nas equipes através do palpite
          </S.ContentInfo>
        </S.Content>
      );
    }
    return (
      <S.Content>
        <S.Button variant="primary" isActive onClick={handleClick}>
          <TwitchLogo width="72" height="100%" fill="white" />
        </S.Button>
      </S.Content>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <CameraIcon />
        <S.Title>Posicione sua câmera aqui</S.Title>
      </S.Header>
      {renderContent()}
    </S.Container>
  );
};

export default Cam;
