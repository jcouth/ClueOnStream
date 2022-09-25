import React, { useRef, useState } from 'react';

import { ReactComponent as CameraIcon } from '../../assets/camera.svg';

import * as S from './styles';

interface Props {
  team: 'red' | 'blue';
  onSend(clue: string, amount: number): void;
}

const AMOUNTS = [0, 1, 2, 3, 4, 5, 6];

const Cam: React.FC<Props> = ({ team, onSend }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const infoDivRef = useRef<HTMLDivElement>(null);

  const [shake, setShake] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [expandAmounts, setExpandAmounts] = useState<boolean>(false);

  const handleNewAmount = (value: number) => {
    setAmount(value);
    setExpandAmounts(false);
  };

  const handleExpandAmounts = () => {
    setExpandAmounts((oldState) => !oldState);
  };

  const handleSend = () => {
    if (inputRef.current?.value && amount !== null) {
      const clue = inputRef.current.value;
      onSend(clue, amount);

      inputRef.current.value = '';
      setAmount(null);
    } else if (!shake) {
      setShake(true);
    }
  };

  const handleLogOut = () => {};

  return (
    <S.Container team={team}>
      <S.Info ref={infoDivRef}>
        <CameraIcon />
        <S.Title>Posicione sua câmera aqui</S.Title>
      </S.Info>
      <S.Content expand={expandAmounts} team={team}>
        <S.Selector
          team={team}
          expand={expandAmounts}
          height={infoDivRef.current?.clientHeight || 0}
        >
          <S.Title>Selecione o número de dicas:</S.Title>
          <S.SelectorContent>
            {AMOUNTS.map((value) => (
              <S.SelectorAmount
                key={value}
                onClick={() => handleNewAmount(value)}
              >
                <S.SelectorAmountText team={team}>{value}</S.SelectorAmountText>
              </S.SelectorAmount>
            ))}
          </S.SelectorContent>
        </S.Selector>
        <S.Controls>
          <S.Input ref={inputRef} placeholder='Digite aqui' />
          <S.Amount onClick={handleExpandAmounts}>
            <S.AmountText team={team}>{amount || '-'}</S.AmountText>
          </S.Amount>
        </S.Controls>
        <S.Buttons>
          <S.LogOut team={team} onClick={handleLogOut}>
            <S.LogOutText team={team}>Sair</S.LogOutText>
          </S.LogOut>
          <S.Send
            className={shake ? 'shake' : ''}
            onClick={handleSend}
            onAnimationEnd={() => setShake(false)}
          >
            <S.SendText team={team}>Enviar</S.SendText>
          </S.Send>
        </S.Buttons>
      </S.Content>
    </S.Container>
  );
};

export default Cam;
