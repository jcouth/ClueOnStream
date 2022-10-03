import styled, { css } from 'styled-components';

import CardOverlay from 'assets/card-overlay.svg';

import * as A from './attrs';

export const CardColors = A.CardColors;

export const Container = styled.button.attrs<A.ContainerProps>(
  A.container
)<A.ContainerProps>`
  position: relative;

  padding: 1.055vw;

  border: none;
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.card.normal.primary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0.528vw;
    left: 0.528vw;

    width: calc(100% - 1.055vw);
    height: calc(100% - 1.055vw);

    border: 0.132vw solid ${({ theme }) => theme.colors.card.normal.secondary};
    border-radius: 0.792vw;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0vw;
    left: 0vw;

    width: 100%;
    height: 100%;

    background-image: url(${CardOverlay});
    background-size: cover;
    background-repeat: no-repeat;
    mix-blend-mode: darken;

    opacity: 0;
  }

  ${({ isOpen, cardType }) =>
    isOpen &&
    css`
      &::before {
        border-color: ${A.CardColors.before[cardType]};
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
      transform: translate3d(-0.066vw, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(0.132vw, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-0.264vw, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(0.264vw, 0, 0);
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

export const Percentage = styled.div.attrs<A.PercentageProps>(
  A.percentage
)<A.PercentageProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.396vw 1.055vw;

  border-radius: 0.264vw;
`;

export const PercentageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div.attrs<A.ContentProps>(
  A.content
)<A.ContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.396vw;
  padding: 0.528vw 0.792vw;

  border-radius: 0.264vw;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentText = styled.p.attrs<A.ContentTextProps>(
  A.contentText
)<A.ContentTextProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.card.normal.text};

  letter-spacing: -0.033vw;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;
