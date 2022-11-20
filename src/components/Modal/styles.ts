import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.shadow};

  overflow: hidden;

  &.visible {
    animation: backgroundOpacity 0.5s ease-out;
    animation-fill-mode: forwards;
  }

  &.hidden {
    animation: hiddenBackgroundOpacity 0.5s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes backgroundOpacity {
    0% {
      z-index: -1;
      background-color: transparent;
    }
    5% {
      z-index: 1;
    }
    100% {
      z-index: 1;
      background-color: ${({ theme }) => theme.colors.shadow};
    }
  }

  @keyframes hiddenBackgroundOpacity {
    0% {
      z-index: 1;
      background-color: ${({ theme }) => theme.colors.shadow};
    }
    95% {
      z-index: 1;
    }
    100% {
      z-index: -1;

      background-color: transparent;
    }
  }
`;

export const Container = styled.div`
  display: grid;
  grid-row-gap: 1.979vw;

  z-index: 1;
  position: absolute;

  margin: auto;
  padding: 1.979vw 1.319vw 1.319vw;

  max-width: 39.578vw;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};

  transform: translateY(-200%);

  &.visible {
    animation: isVisible 0.25s ease-out;
    animation-fill-mode: forwards;
  }

  &.hidden {
    animation: isHidden 0.25s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes isVisible {
    0% {
      margin: 0 auto;
      transform: translateY(-200%);
    }
    100% {
      margin: auto;
      transform: translateY(0%);
    }
  }

  @keyframes isHidden {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(200%);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-row-gap: 1.583vw;

  padding: 1.583vw 1.319vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: 1.979vw;

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Subtitle = styled(Title)`
  font-size: 1.319vw;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 0.923vw;
`;
