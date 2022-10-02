import styled from 'styled-components';

import * as A from './attrs';

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: 2.375vw;
  justify-content: center;
  align-items: center;

  position: relative;

  margin: 4.222vw;
  padding: 3.166vw 3.958vw;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  &::before {
    content: '';
    position: absolute;
    top: 1.319vw;
    left: 1.319vw;

    --size: calc(100% - 2.639vw);
    width: var(--size);
    height: var(--size);

    border-radius: inherit;
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
  }
`;

export const Title = styled.div`
  z-index: 1;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: 3.166vw;

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.528vw 0.528vw ${({ theme }) => theme.colors.black};
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1.055vw;
`;

export const Card = styled.div.attrs<A.CardProps>(A.card)<A.CardProps>`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: 0.792vw;
  justify-content: center;
  align-items: center;

  position: relative;

  padding: 2.375vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  animation: blink 8s infinite;

  @keyframes blink {
    0%,
    25%,
    50%,
    75%,
    100% {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
    12.5% {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const CardText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const CardPins = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  span {
    position: absolute;

    width: 0.792vw;
    height: 0.792vw;

    border-radius: 6.596vw;
    background-color: ${({ theme }) => theme.colors.white};
  }

  span:nth-child(1) {
    top: 0.792vw;
    left: 0.792vw;
  }

  span:nth-child(2) {
    top: 0.792vw;
    right: 0.792vw;
  }

  span:nth-child(3) {
    bottom: 0.792vw;
    left: 0.792vw;
  }

  span:nth-child(4) {
    bottom: 0.792vw;
    right: 0.792vw;
  }
`;
