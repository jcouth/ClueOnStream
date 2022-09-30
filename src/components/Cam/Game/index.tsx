import React, { memo, useRef, useState } from 'react';

import Button from 'components/Button';

import * as S from './styles';

interface Props {
  isStreamerTurn: boolean;
  onSend: (clue: string, amount: number) => void;
  onDisconnect: () => void;
}

const AMOUNTS = [1, 2, 3, 4, 5, 6, 7];

const Game: React.FC<Props> = ({ isStreamerTurn, onSend, onDisconnect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [shake, setShake] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(null);

  const handleNewAmount = (value: number) => {
    setAmount(value);
    setExpand(false);
  };

  const handleExpand = () => {
    setExpand((oldState) => !oldState);
  };

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
      <S.Selector expand={expand} height={4.354}>
        <S.Title>Selecione o número de dicas:</S.Title>
        <S.SelectorContent columns={AMOUNTS.length}>
          {AMOUNTS.map((value) => (
            <Button
              key={value}
              title={value}
              variant="tertiary"
              onClick={() => handleNewAmount(value)}
            />
          ))}
        </S.SelectorContent>
      </S.Selector>
      <S.Controls>
        <S.Input ref={inputRef} placeholder="Digite aqui" />
        <Button
          title={amount ?? '-'}
          variant="tertiary"
          onClick={handleExpand}
        />
      </S.Controls>
      <S.Buttons>
        <Button title="Sair" variant="secondary" onClick={onDisconnect} />
        <Button
          title="Enviar"
          variant="primary"
          isActive={isStreamerTurn}
          className={shake ? 'shake' : ''}
          onClick={handleSend}
          onAnimationEnd={() => setShake(false)}
        />
      </S.Buttons>
    </S.Content>
  );
};

export default memo(Game);
