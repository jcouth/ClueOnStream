import React from 'react';

import { ReactComponent as TwitchLogo } from '@assets/twitch-logo.svg';
import { ReactComponent as CameraIcon } from '@assets/camera.svg';
import Button from '@components/Button';
import { Status } from '@interfaces/Status';

import Game from './Game';

import * as S from './styles';

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
          <Button
            title="Sair"
            variant="secondary"
            isActive
            onClick={handleClick}
          />
          <Button
            title="Iniciar"
            variant="primary"
            isActive
            onClick={handleClick}
          />
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
        <Button variant="primary" isActive onClick={handleClick}>
          <TwitchLogo width="72" height="100%" fill="white" />
        </Button>
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
