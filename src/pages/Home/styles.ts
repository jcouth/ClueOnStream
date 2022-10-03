import styled from 'styled-components';

import Overlay from 'assets/overlay.svg';

import * as A from './attrs';

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

export const Content = styled.div.attrs<A.ContentProps>(
  A.content
)<A.ContentProps>`
  display: grid;
  grid-template-columns: 23.087vw 1fr;
  grid-column-gap: 1.319vw;

  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 0.792vw;

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

  &.animate {
    animation: animate 0.75s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes animate {
    0% {
      font-size: initial;

      opacity: 0;
      transform: scale(0.9);
    }
    50% {
      font-size: initial;
    }
    100% {
      font-size: ${({ theme }) => theme.fonts.primary.subtitle};

      opacity: 1;
      transform: scale(1);
    }
  }
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
