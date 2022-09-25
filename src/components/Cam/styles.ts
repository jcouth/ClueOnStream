import styled from 'styled-components';

type Teams = 'red' | 'blue';

const ButtonBase = styled.button`
  padding: 12px;

  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white_90};
  }
`;

const ButtonTextBase = styled.p<{ team: Teams }>`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  color: ${({ theme, team }) => theme.colors.team[team].primary};

  background-clip: text;
  background-color: rgba(0, 0, 0, 0.75);
  -webkit-background-clip: text;
  -moz-background-clip: text;

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Container = styled.div<{ team: Teams }>`
  display: flex;
  flex-direction: column;

  padding: 12px 16px;

  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  background-color: ${({ theme, team }) => theme.colors.team[team].secondary};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const Content = styled.div<{ team: Teams }>`
  flex-grow: 1;
  display: grid;
  grid-row-gap: 8px;

  margin-top: 12px;
  padding: 18px 14px;

  border-radius: 12px;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: inset 0px 4px 4px ${({ theme }) => theme.colors.shadow};
`;

export const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 44px;
  grid-column-gap: 8px;
`;

export const Input = styled.input.attrs({
  ariaAutocomplete: 'none',
})`
  padding: 12px;

  width: 100%;

  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  outline: 0;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  text-transform: uppercase;
`;

export const Amount = styled(ButtonBase)``;

export const AmountText = styled(ButtonTextBase)`
  color: initial;
`;

export const Buttons = styled(Controls)`
  grid-template-columns: 1fr 2fr;
`;

export const LogOut = styled(ButtonBase)<{ team: Teams }>`
  background-color: ${({ theme, team }) => theme.colors.team[team].secondary};

  &:hover {
    background-color: ${({ theme, team }) =>
      theme.colors.team[team].secondary_90};
  }
`;

export const LogOutText = styled(ButtonTextBase)`
  color: ${({ theme }) => theme.colors.white};

  background-color: none;
`;

export const Send = styled(ButtonBase)``;

export const SendText = styled(ButtonTextBase)``;
