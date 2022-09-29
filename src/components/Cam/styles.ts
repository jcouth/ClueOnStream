import styled from 'styled-components';

import theme from '@global/styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export const buttonColors = {
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px 16px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  padding-bottom: 12px;
`;

export const Title = styled.p`
  margin-top: 6px;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-row-gap: 8px;
  align-items: flex-end;

  position: relative;

  padding: 18px 14px;

  min-height: 135px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const ContentInfo = styled(Title)`
  display: flex;
  align-items: center;

  margin-top: unset;

  height: 100%;

  text-align: center;
`;

export const Button = styled.button<{
  variant: ButtonVariant;
  isActive?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 12px;

  border: ${({ theme, variant, isActive }) =>
    variant === 'primary'
      ? `3px solid ${isActive ? theme.colors.white : theme.colors.secondary}`
      : 'none'};
  border-radius: 6px;
  background-color: ${({ variant }) => buttonColors[variant].background};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

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

export const ButtonText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: inherit;

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;
