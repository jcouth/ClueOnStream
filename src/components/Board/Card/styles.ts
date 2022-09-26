import styled, { css } from 'styled-components';
import theme from '../../../global/styles/theme';

import { Card as CardProps, CardType } from '../../../interfaces/Card';

interface StyledCardProps {
  isOpen: CardProps['isOpen'];
  cardType: CardProps['type'];
}

interface CardColorsProps {
  principal: { [key in CardType]: string };
  before: { [key in CardType]: string };
}

const CardColors: CardColorsProps = {
  principal: {
    red: theme.colors.team.red.primary,
    blue: theme.colors.team.blue.primary,
    no_team: theme.colors.white,
    game_over: theme.colors.card.gameOver.primary,
  },
  before: {
    red: theme.colors.team.red.secondary,
    blue: theme.colors.team.blue.secondary,
    no_team: theme.colors.white,
    game_over: theme.colors.card.gameOver.secondary,
  },
};

export const Container = styled.button<StyledCardProps>`
  position: relative;

  padding: 16px;

  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.card.normal.primary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;

    width: calc(100% - 16px);
    height: calc(100% - 16px);

    border: 2px solid ${({ theme }) => theme.colors.card.normal.secondary};
    border-radius: 12px;
  }

  ${({ isOpen, cardType }) =>
    isOpen &&
    css`
      background-color: ${CardColors.principal[cardType]};

      &::before {
        border-color: ${CardColors.before[cardType]};
      }
    `}

  &.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Percentage = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px 16px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.team.red.primary};

  ${({ visible }) =>
    !visible &&
    css`
      visibility: hidden;
    `}
`;

export const PercentageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 6px;
  padding: 8px 12px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.card.normal.text};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;
