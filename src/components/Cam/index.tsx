import React, { useRef } from 'react';

import { ReactComponent as CameraIcon } from '../../assets/camera.svg';

import * as S from './styles';

interface Props {
  team: 'red' | 'blue';
  onSend(clue: string, amount: number): void;
}

const Cam: React.FC<Props> = ({ team, onSend }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputRef.current?.value) {
      onSend(inputRef.current.value, 0);
    }
  };

  const handleLogOut = () => {};

  return (
    <S.Container team={team}>
      <S.Info>
        <CameraIcon />
        <S.Title>Posicione sua câmera aqui</S.Title>
      </S.Info>
      <S.Content team={team}>
        <S.Controls>
          <S.Input ref={inputRef} placeholder='Digite aqui' />
          <S.Amount>
            <S.AmountText team={team}>0</S.AmountText>
          </S.Amount>
        </S.Controls>
        <S.Buttons>
          <S.LogOut team={team} onClick={handleLogOut}>
            <S.LogOutText team={team}>Sair</S.LogOutText>
          </S.LogOut>
          <S.Send onClick={handleSend}>
            <S.SendText team={team}>Enviar</S.SendText>
          </S.Send>
        </S.Buttons>
      </S.Content>
    </S.Container>
  );
};

export default Cam;
