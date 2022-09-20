import React, { useCallback, useEffect, useState } from 'react';

import { CardStatus } from '../../interfaces/Cards';

import * as S from './styles';

interface Props {
  title?: string;
  status: CardStatus;
  onOpen(): void;
}

const colors: { [key in keyof typeof CardStatus]: string } = {
  UNOPEN: '#DBBEA1',
  OPEN: '#D34F73',
  WRONG: '#3F292B',
  GAME_OVER: 'rgba(0, 0, 0, 0.5)',
};

const Card: React.FC<Props> = ({ title, status, onOpen }) => {
  const [color, setColor] = useState(colors[CardStatus.UNOPEN]);

  const handleOpen = useCallback(() => {
    console.log(CardStatus.UNOPEN, colors[CardStatus.UNOPEN]);
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    setColor(colors[status]);
  }, [status]);

  return (
    <S.Container
      status={color}
      isOpen={status !== CardStatus.UNOPEN}
      disabled={status !== CardStatus.UNOPEN}
      onClick={handleOpen}
    >
      <S.Content status={color}>
        <S.Title>{title}</S.Title>
      </S.Content>
    </S.Container>
  );
};

export default Card;
