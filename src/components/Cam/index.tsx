import React, { useRef, useState } from 'react';

import { ReactComponent as CameraIcon } from '../../assets/camera.svg';

import * as S from './styles';

interface Props {
  isStreamerTurn: boolean;
  onSend(clue: string, amount: number): void;
  inMenu?: boolean;
}

const AMOUNTS = [1, 2, 3, 4, 5, 6, 7];

const Cam: React.FC<Props> = ({ isStreamerTurn, onSend, inMenu = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
    if (isStreamerTurn && inputRef.current?.value && amount !== null) {
      const clue = inputRef.current.value;
      onSend(clue, amount);

      inputRef.current.value = '';
      setAmount(null);
      setExpandAmounts(false);
    } else if (!shake) {
      setShake(true);
    }
  };

  const handleGoToMenu = () => {};

  const handleSettings = () => {};

  const handleLogOut = () => {};

  const handleStart = () => {};

  const renderInMenu = () => (
    <>
      <S.Button variant='secondary' onClick={handleSettings}>
        <S.ButtonText>Configurações</S.ButtonText>
      </S.Button>
      <S.Buttons>
        <S.Button variant='secondary' onClick={handleLogOut}>
          <S.ButtonText>Deslogar</S.ButtonText>
        </S.Button>
        <S.Button variant='primary' onClick={handleStart}>
          <S.ButtonText>Iniciar</S.ButtonText>
        </S.Button>
      </S.Buttons>
    </>
  );

  const renderInGame = () => (
    <>
      <S.Selector
        expand={expandAmounts}
        height={headerRef.current?.clientHeight || 0}
      >
        <S.Title>Selecione o número de dicas:</S.Title>
        <S.SelectorContent columns={AMOUNTS.length}>
          {AMOUNTS.map((value) => (
            <S.Button
              key={value}
              variant='tertiary'
              onClick={() => handleNewAmount(value)}
            >
              <S.ButtonText>{value}</S.ButtonText>
            </S.Button>
          ))}
        </S.SelectorContent>
      </S.Selector>
      <S.Controls>
        <S.Input ref={inputRef} placeholder='Digite aqui' />
        <S.Button variant='tertiary' onClick={handleExpandAmounts}>
          <S.ButtonText>{amount || '-'}</S.ButtonText>
        </S.Button>
      </S.Controls>
      <S.Buttons>
        <S.Button variant='secondary' onClick={handleGoToMenu}>
          <S.ButtonText>Sair</S.ButtonText>
        </S.Button>
        <S.Button
          variant='primary'
          className={shake ? 'shake' : ''}
          onClick={handleSend}
          onAnimationEnd={() => setShake(false)}
        >
          <S.ButtonText>Enviar</S.ButtonText>
        </S.Button>
      </S.Buttons>
    </>
  );

  return (
    <S.Container>
      <S.Header ref={headerRef}>
        <CameraIcon />
        <S.Title>Posicione sua câmera aqui</S.Title>
      </S.Header>
      <S.Content expand={expandAmounts}>
        {inMenu ? renderInMenu() : renderInGame()}
      </S.Content>
    </S.Container>
  );
};

export default Cam;
