import styled, { css } from 'styled-components';

import theme from 'global/styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export const buttonColors: {
  [key in ButtonVariant]: { background: string; color: string };
} = {
  primary: {
    background: theme.colors.primary,
    color: theme.colors.white,
  },
  secondary: {
    background: theme.colors.secondary,
    color: theme.colors.white,
  },
  tertiary: {
    background: theme.colors.white,
    color: theme.colors.black,
  },
};

export interface ButtonProps {
  variant: ButtonVariant;
  isActive?: boolean;
}

export const buttonCssStyle = css<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.792vw;

  max-height: 3.166vw;
  height: 100%;

  border: ${({ theme, variant, isActive }) =>
    variant === 'primary'
      ? `0.198vw solid ${
          isActive ? theme.colors.white : theme.colors.secondary
        }`
      : 'none'};
  border-radius: 0.396vw;
  background-color: ${({ variant }) => buttonColors[variant].background};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  color: ${({ variant, isActive }) =>
    variant === 'primary'
      ? isActive
        ? buttonColors.primary.color
        : theme.colors.secondary
      : buttonColors[variant].color};

  /* &:hover {
    background-color: ${({ theme }) => theme.colors.white_90};
  } */

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
`;

export const Button = styled.button<ButtonProps>`
  ${buttonCssStyle}
`;

export const ButtonText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: inherit;

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;
