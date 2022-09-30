import styled, { css } from 'styled-components';

import theme from 'global/styles/theme';
import { CardProps, CardType, Team } from 'interfaces/Card';

interface StyledCardProps {
  isOpen: CardProps['isOpen'];
  revealed: CardProps['revealed'];
  cardType: CardProps['type'];
  delayToOpen: CardProps['delayToOpen'];
}

interface CardColorsProps {
  principal: { [key in CardType]: string };
  before: { [key in CardType]: string };
}

export const CardColors: CardColorsProps = {
  principal: {
    red: theme.colors.team.red.primary,
    blue: theme.colors.team.blue.primary,
    no_team: theme.colors.card.normal.secondary,
    game_over: theme.colors.card.gameOver.primary,
  },
  before: {
    red: theme.colors.team.red.secondary,
    blue: theme.colors.team.blue.secondary,
    no_team: theme.colors.card.normal.primary,
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

  overflow: hidden;

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

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    background-image: url('https://as2.ftcdn.net/v2/jpg/03/01/38/69/1000_F_301386906_5rgf3LdlmG36cXq8Hm27HMBSSgGdArA5.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    mix-blend-mode: darken;

    opacity: 0;
  }

  ${({ isOpen, cardType, delayToOpen }) =>
    isOpen &&
    css`
      background-color: ${CardColors.principal[cardType]};

      transition: background-color 0.5s ease-out ${0.5 + delayToOpen}s;

      &::before {
        border-color: ${CardColors.before[cardType]};
      }
    `}

  ${({ revealed, delayToOpen }) =>
    revealed &&
    css`
      &::before {
        opacity: 0.5;

        transition: border-color 0.5s ease-out ${0.5 + delayToOpen}s,
          opacity 0.5s ease-out ${0.5 + delayToOpen}s;
      }
      &::after {
        opacity: 0.5;

        transition: opacity 0.5s ease-out ${0.5 + delayToOpen}s;
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

  &.opens {
    animation: opens 1s ease-in-out ${({ delayToOpen }) => delayToOpen}s;
  }

  @keyframes opens {
    0%,
    75%,
    100% {
      transform: scale(1);
    }
    25%,
    50% {
      transform: scale(1.05);
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Percentage = styled.div<{ team: Team; visible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 6px 16px;

  border-radius: 4px;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};

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

export const Content = styled.div<StyledCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 6px;
  padding: 8px 12px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ isOpen, revealed, cardType, delayToOpen }) =>
    revealed
      ? css`
          visibility: hidden;

          transition: visibility ${0.5 + delayToOpen}s linear;
        `
      : isOpen &&
        css`
          background-color: ${CardColors.before[cardType]};

          transition: background-color ${0.5 + delayToOpen}s ease-in;
        `}
`;

export const ContentText = styled.p<Omit<StyledCardProps, 'cardType'>>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.card.normal.text};

  letter-spacing: -0.5px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  ${({ isOpen, revealed, delayToOpen }) =>
    revealed
      ? css`
          visibility: hidden;

          transition: visibility ${0.5 + delayToOpen}s linear;
        `
      : isOpen &&
        css`
          color: ${theme.colors.white};

          transition: color ${0.5 + delayToOpen}s ease-in;
        `}
`;
