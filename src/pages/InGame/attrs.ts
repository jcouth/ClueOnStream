import theme from 'global/styles/theme';
import { Team } from 'interfaces/Card';

export interface ContentProps {
  inLobby: boolean;
  team: Team;
}
export const content = ({ inLobby, team }: ContentProps) => {
  return {
    style: {
      backgroundColor: inLobby
        ? theme.colors.primary
        : theme.colors.team[team].primary,
      backgroundImage: inLobby ? undefined : 'inherit',
      backgroundSize: inLobby ? undefined : 'inherit',
      backgroundRepeat: inLobby ? undefined : 'inherit',
    },
  };
};

export interface TimerProps {
  expand: boolean;
}
export const timer = ({ expand }: TimerProps) => {
  const boxShadow = 'inset 0vw 0.264vw 0.264vw';
  return {
    style: {
      boxShadow: `${boxShadow} ${expand ? 'transparent' : theme.colors.shadow}`,
      transition: `box-shadow 0.25s ease-out ${expand ? 0 : 0.5}s`,
    },
  };
};

export interface SelectorProps {
  expand: boolean;
  height: number;
}
export const selector = ({ expand, height }: SelectorProps) => {
  const boxShadow = 'inset 0vw 0.264vw 0.264vw';
  return {
    style: {
      top: `${expand ? -height : 0.66}vw`,
      padding: `${expand ? 0.396 : 0}vw 0.923vw`,
      height: `${expand ? height + 0.66 : 0}vw}`,
      boxShadow: `${boxShadow} ${expand ? theme.colors.shadow : 'transparent'}`,
    },
  };
};

export interface SelectorContentProps {
  columns: number;
}
export const selectorContent = ({ columns }: SelectorContentProps) => {
  return {
    style: {
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    },
  };
};
