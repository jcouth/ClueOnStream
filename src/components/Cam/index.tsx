import React from 'react';

import { ReactComponent as TwitchLogo } from 'assets/twitch-logo.svg';
import { ReactComponent as CameraIcon } from 'assets/camera.svg';
import Button from 'components/Button';
import { Status } from 'interfaces/Status';

import Game from './Game';

import * as S from './styles';

interface Props {
  type?: Status;
  isStreamerTurn: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onNewGame: () => void;
  onSend: (clue: string, amount: number) => void;
}

const Cam: React.FC<Props> = ({
  type,
  isStreamerTurn,
  onConnect,
  onDisconnect,
  onNewGame,
  onSend,
}) => {
  const renderContent = () => {
    if (type === Status.GAME) {
      return (
        <Game
          isStreamerTurn={isStreamerTurn}
          onSend={onSend}
          onDisconnect={onDisconnect}
        />
      );
    }
    if (type === Status.WAITING_START) {
      return (
        <S.Content>
          <Button
            title="Sair"
            variant="secondary"
            isActive
            onClick={onDisconnect}
          />
          <Button
            title="Iniciar"
            variant="primary"
            isActive
            onClick={onNewGame}
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
        <Button variant="primary" isActive onClick={onConnect}>
          <TwitchLogo width="100%" height="1.583vw" fill="white" />
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
