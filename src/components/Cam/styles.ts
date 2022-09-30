import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.792vw 1.055vw;

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  padding-bottom: 0.792vw;
`;

export const Title = styled.p`
  margin-top: 0.396vw;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme }) => theme.colors.white};

  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Content = styled.div`
  flex-grow: 1;
  display: grid;
  grid-row-gap: 0.528vw;
  align-items: flex-end;

  position: relative;

  padding: 1.187vw 0.923vw;

  min-height: 8.905vw;

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const ContentInfo = styled(Title)`
  display: flex;
  align-items: center;

  margin-top: unset;

  height: 100%;

  text-align: center;
`;
