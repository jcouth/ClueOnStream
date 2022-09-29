import styled from 'styled-components';

import { Content as ParentContent } from '../styles';

export const Content = styled(ParentContent)<{ expand: boolean }>`
  box-shadow: inset 0px 4px 4px
    ${({ theme, expand }) => (expand ? 'transparent' : theme.colors.shadow)};

  transition: box-shadow 0.25s ease-out ${({ expand }) => (expand ? 0 : 0.5)}s;
`;

export const Selector = styled.div<{ expand: boolean; height: number }>`
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
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0px 4px 4px
    ${({ theme, expand }) => (expand ? theme.colors.shadow : 'transparent')};

  overflow: hidden;
  transition: height 0.5s ease-in-out, top 0.5s ease-in-out,
    padding 0.5s ease-in-out, box-shadow 0.25s ease-in-out 0.125s;
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

export const SelectorContent = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  grid-template-rows: 32px;
  grid-column-gap: 8px;

  margin-top: 4px;
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

export const Buttons = styled(Controls)`
  grid-template-columns: 1fr 2fr;
`;
