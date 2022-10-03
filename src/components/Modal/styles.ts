import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  /* background-color: red; */
`;

export const Content = styled.div`
  display: inline-grid;
  grid-template-rows: auto auto;
  grid-row-gap: 40px;

  padding: 16px 32px;

  /* max-width: 600px                     ; */
  /* width: auto; */

  border: 0.264vw solid ${({ theme }) => theme.colors.white};
  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: 30px;

  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  text-transform: uppercase;
  text-shadow: 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;

export const Subtitle = styled(Title)`
  font-size: 20px;
`;

export const Buttons = styled.div`
  /* flex-grow: 1; */
  display: grid;
  grid-template-columns: auto auto;
  /* grid-column-gap: 0.528vw; */

  /* padding: 1.187vw 0.923vw; */

  border-radius: 0.792vw;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0vw 0.264vw 0.264vw ${({ theme }) => theme.colors.shadow};
`;
