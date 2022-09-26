import styled, { css } from 'styled-components';

type Teams = 'red' | 'blue';

const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

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

const ButtonTextBase = styled.p<{ team?: Teams }>`
  font-family: ${({ theme }) => theme.fonts.primary.family};
  font-weight: ${({ theme }) => theme.fonts.primary.weight};
  font-size: ${({ theme }) => theme.fonts.primary.size};

  background-clip: text;
  background-color: rgba(0, 0, 0, 0.75);
  -webkit-background-clip: text;
  -moz-background-clip: text;

  text-transform: uppercase;
  text-shadow: 0px 4px 4px ${({ theme }) => theme.colors.shadow};

  ${({ theme, team }) =>
    team &&
    css`
      color: ${theme.colors.team[team].primary};
    `}
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

export const Content = styled.div<{ team: Teams; expand: boolean }>`
  flex-grow: 1;
  display: grid;
  grid-row-gap: 8px;

  position: relative;

  padding: 18px 14px;

  border-radius: 12px;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: inset 0px 4px 4px
    ${({ theme, expand }) => (expand ? 'transparent' : theme.colors.shadow)};

  transition: box-shadow 0.25s ease-out ${({ expand }) => (expand ? 0 : 0.5)}s;
`;

export const Settings = styled(ButtonBase)``;

export const SettingsText = styled(ButtonTextBase)`
  color: initial;
`;

export const LogOut = styled(ButtonBase)``;

export const LogOutText = styled(ButtonTextBase)`
  color: initial;
`;

export const Start = styled(ButtonBase)``;

export const StartText = styled(ButtonTextBase)`
  color: initial;
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

export const GoToMenu = styled(ButtonBase)<{ team: Teams }>`
  background-color: ${({ theme, team }) => theme.colors.team[team].secondary};

  &:hover {
    background-color: ${({ theme, team }) =>
      theme.colors.team[team].secondary_90};
  }
`;

export const GoToMenuText = styled(ButtonTextBase)`
  color: ${({ theme }) => theme.colors.white};

  background-color: none;
`;

export const Send = styled(ButtonBase)`
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

export const SendText = styled(ButtonTextBase)``;

export const Selector = styled.div<{
  team: Teams;
  expand: boolean;
  height: number;
}>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${({ expand, height }) => (expand ? -height : 12)}px;

  padding: ${({ expand }) => (expand ? 6 : 0)}px 14px;

  width: 100%;
  height: ${({ expand, height }) => (expand ? height + 12 : 0)}px;

  border-radius: 12px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ theme, team }) => theme.colors.team[team].primary};
  box-shadow: inset 0px 4px 4px
    ${({ theme, expand }) => (expand ? theme.colors.shadow : 'transparent')};

  overflow: hidden;
  transition: height 0.5s ease-in-out, top 0.5s ease-in-out,
    padding 0.5s ease-in-out, box-shadow 0.25s ease-in-out 0.125s;
`;

export const SelectorContent = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  grid-template-rows: 32px;
  grid-column-gap: 8px;

  margin-top: 4px;
`;

export const SelectorAmount = styled(Amount)``;

export const SelectorAmountText = styled(AmountText)``;
