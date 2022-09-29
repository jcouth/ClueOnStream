import React from 'react';

import { ReactComponent as CameraIcon } from '../../assets/camera.svg';

import Game from './Game';

import * as S from './styles';

interface Props {
  isStreamerTurn: boolean;
  onSend(clue: string, amount: number): void;
  inLobby?: boolean;
}

const Cam: React.FC<Props> = ({ isStreamerTurn, onSend, inLobby = false }) => {
  const handleSettings = () => {};

  // const handleLogOut = () => {};

  // const handleStart = () => {};

  const renderLobby = () => (
    <>
      <S.Button variant='secondary' onClick={handleSettings}>
        <S.ButtonText>Configurações</S.ButtonText>
      </S.Button>
      {/* <S.Buttons>
        <S.Button variant='secondary' onClick={handleLogOut}>
          <S.ButtonText>Deslogar</S.ButtonText>
        </S.Button>
        <S.Button variant='primary' onClick={handleStart}>
          <S.ButtonText>Iniciar</S.ButtonText>
        </S.Button>
      </S.Buttons> */}
    </>
  );

  return (
    <S.Container>
      <S.Header>
        <CameraIcon />
        <S.Title>Posicione sua câmera aqui</S.Title>
      </S.Header>
      {inLobby ? (
        renderLobby()
      ) : (
        <Game isStreamerTurn={isStreamerTurn} onSend={onSend} />
      )}
    </S.Container>
  );
};

export default Cam;
