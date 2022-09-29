import React, { memo, useRef, useState } from 'react';

import { Button, ButtonText, Title } from '../styles';

import * as S from './styles';

interface Props {
  isStreamerTurn: boolean;
  onSend(clue: string, amount: number): void;
}

const AMOUNTS = [1, 2, 3, 4, 5, 6, 7];

const Game: React.FC<Props> = ({ isStreamerTurn, onSend }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [shake, setShake] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [expand, setExpand] = useState<boolean>(false);

  const handleNewAmount = (value: number) => {
    setAmount(value);
    setExpand(false);
  };

  const handleExpand = () => {
    setExpand((oldState) => !oldState);
  };

  const handleLobby = () => {};

  const handleSend = () => {
    if (isStreamerTurn && inputRef.current?.value && amount !== null) {
      const clue = inputRef.current.value;
      onSend(clue, amount);

      inputRef.current.value = '';
      setAmount(null);
      setExpand(false);
    } else if (!shake) {
      setShake(true);
    }
  };

  return (
    <S.Content expand={expand}>
      <S.Selector expand={expand} height={66}>
        <Title>Selecione o número de dicas:</Title>
        <S.SelectorContent columns={AMOUNTS.length}>
          {AMOUNTS.map((value) => (
            <Button
              key={value}
              variant='tertiary'
              onClick={() => handleNewAmount(value)}
            >
              <ButtonText>{value}</ButtonText>
            </Button>
          ))}
        </S.SelectorContent>
      </S.Selector>
      <S.Controls>
        <S.Input ref={inputRef} placeholder='Digite aqui' />
        <Button variant='tertiary' onClick={handleExpand}>
          <ButtonText>{amount || '-'}</ButtonText>
        </Button>
      </S.Controls>
      <S.Buttons>
        <Button variant='secondary' onClick={handleLobby}>
          <ButtonText>Sair</ButtonText>
        </Button>
        <Button
          variant='primary'
          isActive={isStreamerTurn}
          className={shake ? 'shake' : ''}
          onClick={handleSend}
          onAnimationEnd={() => setShake(false)}
        >
          <ButtonText>Enviar</ButtonText>
        </Button>
      </S.Buttons>
    </S.Content>
  );
};

export default memo(Game);
