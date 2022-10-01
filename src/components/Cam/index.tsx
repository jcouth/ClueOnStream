import React from 'react';

import uuid from 'react-uuid';

import { ReactComponent as TwitchLogo } from 'assets/twitch-logo.svg';
import { ReactComponent as CameraIcon } from 'assets/camera.svg';
import Button from 'components/Button';
import { Status } from 'interfaces/Status';

import Game from './Game';

import * as S from './styles';

const {
  REACT_APP_TWITCH_LOGIN_URL,
  REACT_APP_TWITCH_CLIENT_ID,
  REACT_APP_TWITCH_REDIRECT_URL,
  REACT_APP_TWITCH_SCOPES,
} = process.env;

interface Props {
  type?: Status;
  isStreamerTurn: boolean;
  onDisconnect: () => void;
  onNewGame: () => void;
  onSend: (clue: string, amount: number) => void;
}

const Cam: React.FC<Props> = ({
  type,
  isStreamerTurn,
  onDisconnect,
  onNewGame,
  onSend,
}) => {
  const handleConnect = (
    e: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const twitchState = uuid();

    const url = `${REACT_APP_TWITCH_LOGIN_URL ?? ''}/authorize?client_id=${
      REACT_APP_TWITCH_CLIENT_ID ?? ''
    }&redirect_uri=${encodeURIComponent(
      REACT_APP_TWITCH_REDIRECT_URL ?? ''
    )}&response_type=token&scope=${
      REACT_APP_TWITCH_SCOPES ?? ''
    }&state=${twitchState}`;

    localStorage.setItem('@ClueOnStream::twitch_state', twitchState);

    window.location.href = url;
  };

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
    if (type === Status.FINISH_GAME) {
      return (
        <S.Content>
          <Button
            title="Sair"
            variant="secondary"
            isActive
            onClick={onDisconnect}
          />
          <Button
            title="Novo jogo"
            variant="primary"
            isActive
            onClick={onNewGame}
          />
        </S.Content>
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
        <S.ButtonLink
          href="#"
          onClick={handleConnect}
          variant="primary"
          isActive
        >
          <TwitchLogo width="100%" height="1.583vw" fill="white" />
        </S.ButtonLink>
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
