import React from 'react';

import uuid from 'react-uuid';

import { ReactComponent as TwitchLogo } from 'assets/twitch-logo.svg';
import { ReactComponent as CameraIcon } from 'assets/camera.svg';
import Button from 'components/Button';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';

import * as S from './styles';
import Game from './Game';

const {
  REACT_APP_TWITCH_LOGIN_URL,
  REACT_APP_TWITCH_CLIENT_ID,
  REACT_APP_TWITCH_REDIRECT_URL,
  REACT_APP_TWITCH_SCOPES,
} = process.env;

type Props =
  | {
      lobby: true;
      onDisconnect?: never;
      onNewGame?: never;
    }
  | {
      lobby?: never;
      onDisconnect: () => void;
      onNewGame: () => void;
    };

const Cam: React.FC<Props> = ({ lobby, onDisconnect, onNewGame }) => {
  const {
    status,
    isStreamerTurn,
    handleClue,
    handleIsStreamerTurn,
    handleIsTimerRunning,
  } = useGame();

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

    localStorage.setItem('@ClueOnStream::state', twitchState);

    window.location.href = url;
  };

  const handleSendClue = (description: string, amount: number) => {
    handleClue({
      description,
      amount,
    });
    handleIsStreamerTurn(false);
    handleIsTimerRunning(true);
  };

  const renderContent = () => {
    if (lobby) {
      return (
        <S.Content>
          <S.ContentInfo>Conecte-se à Twitch para acessar o jogo</S.ContentInfo>
          <S.ButtonLink
            href="#"
            onClick={handleConnect}
            variant="primary"
            isActive
            aria-label="Botão para conectar-se à twitch"
          >
            <TwitchLogo width="100%" height="1.583vw" fill="white" />
          </S.ButtonLink>
        </S.Content>
      );
    }

    if (status === Status.GAME) {
      return (
        <Game
          isStreamerTurn={isStreamerTurn}
          onSend={handleSendClue}
          onDisconnect={onDisconnect}
        />
      );
    }
    if (status === Status.FINISH_GAME) {
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
    if (status === Status.WAITING_START) {
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

    return (
      <S.Content>
        <S.ContentInfo>
          Espere o chat entrar nas equipes através do palpite
        </S.ContentInfo>
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
