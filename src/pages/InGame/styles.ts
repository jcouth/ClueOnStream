import styled, { css } from 'styled-components';

import Overlay from 'assets/overlay.svg';
import { Team } from 'interfaces/Card';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.319vw 4.749vw;

  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url(${Overlay});
  background-size: cover;
  background-repeat: no-repeat;
  mix-blend-mode: overlay;
`;

export const Content = styled.div<{ inLobby: boolean; team: Team }>`
  display: grid;
  grid-template-columns: 23.087vw 1fr;
  grid-column-gap: 1.319vw;

  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 0.792vw;
  background-color: ${({ theme, inLobby, team }) =>
    inLobby ? theme.colors.primary : theme.colors.team[team].primary};

  overflow: hidden;
  transition: background-color 0.5s ease-in-out,
    background-image 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: inherit;
    border: 0.264vw solid ${({ theme }) => theme.colors.white};
  }

  ${({ inLobby }) =>
    !inLobby &&
    css`
      background-image: inherit;
      background-size: inherit;
      background-repeat: inherit;
    `}
`;

export const Aside = styled.aside`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-row-gap: 1.319vw;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 1.319vw; // same of content column gap
`;

export const HowToPlay = styled.div`
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

    width: calc(100% - 2.639vw);
    height: calc(100% - 2.639vw);

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

export const TipsToPlay = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1.055vw;
`;

export const TipCard = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  padding: 2.375vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  animation: blink 8s infinite;
  animation-delay: ${({ delay }) => delay}s;

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

export const TipText = styled.p`
  margin-top: 0.792vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const TipCardButtons = styled.span`
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
