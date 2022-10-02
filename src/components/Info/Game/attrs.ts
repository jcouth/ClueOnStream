import theme from 'global/styles/theme';
import { Team } from 'interfaces/Card';

export interface TeamProps {
  team: Team;
}
export const team = ({ team }: TeamProps) => {
  return {
    style: {
      backgroundColor: theme.colors.team[team].primary,
    },
  };
};

export interface ClueTitleProps {
  team: Team;
}
export const clueTitle = ({ team }: ClueTitleProps) => {
  return {
    style: {
      borderLeft: `0.792vw solid ${theme.colors.team[team].primary}`,
      backgroundColor: theme.colors.team[team].secondary,
    },
  };
};

export interface ClueAmountProps {
  team: Team;
}
export const clueAmount = ({ team }: ClueAmountProps) => {
  return {
    style: {
      backgroundColor: theme.colors.team[team].primary,
    },
  };
};
