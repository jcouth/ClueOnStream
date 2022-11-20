import styled from 'styled-components';

import Overlay from 'assets/overlay.svg';

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

export const Content = styled.div`
  display: grid;
  grid-template-columns: 23.087vw 1fr;
  grid-column-gap: 1.319vw;

  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};

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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2vw;

  width: 100%;
  height: 100%;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.team.red.primary_90};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.subtitle};

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Subtitle = styled(Title)`
  font-size: ${({ theme }) => theme.fonts.primary.size};
`;

export const Loading = styled.span`
  position: relative;

  width: 100%;
  height: 100%;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 1.649vw);
    left: calc(50% - 1.649vw);

    width: 3.298vw;
    height: 3.298vw;

    border: 0.528vw solid ${({ theme }) => theme.colors.white_90};
    border-top: 0.528vw solid transparent;
    border-radius: 50%;

    animation: spinner 1s linear infinite;
  }
`;
