import React, { memo, useState } from 'react';

import { ReactComponent as ProfileCard } from 'assets/profile-card.svg';
import theme from 'global/styles/theme';
import { CardProps, Team } from 'interfaces/Card';

import * as S from './styles';

interface Props extends CardProps {
  team: Team;
  totalVotes: number;
  isStreamerTurn: boolean;
  onOpen: (id: CardProps['id'], type: CardProps['type']) => void;
}

const Card: React.FC<Props> = ({
  id,
  title,
  isOpen,
  type,
  votes,
  team,
  totalVotes,
  isStreamerTurn,
  onOpen,
}) => {
  const [shake, setShake] = useState<boolean>(false);

  const handleOpen = () => {
    if (isOpen || isStreamerTurn) {
      if (!shake) {
        setShake(true);
      }
    } else {
      onOpen(id, type);
    }
  };

  return (
    <S.Container
      isOpen={isOpen}
      cardType={type}
      onClick={handleOpen}
      className={shake ? 'shake' : ''}
      onAnimationEnd={() => setShake(false)}
    >
      <S.Header>
        <S.Percentage team={team} visible={votes > 0}>
          <S.PercentageText>
            {((votes / totalVotes) * 100).toFixed(0)}%
          </S.PercentageText>
        </S.Percentage>
        <ProfileCard
          fill={
            isOpen
              ? S.CardColors.before[type]
              : theme.colors.card.normal.secondary
          }
        />
      </S.Header>
      <S.Content isOpen={isOpen} cardType={type}>
        <S.ContentText isOpen={isOpen}>{title}</S.ContentText>
      </S.Content>
    </S.Container>
  );
};

export default memo(Card);
