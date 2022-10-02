import theme from 'global/styles/theme';
import { CardProps, CardType, Team } from 'interfaces/Card';

interface StyledCardProps {
  isOpen: CardProps['isOpen'];
  revealed: CardProps['revealed'];
  cardType: CardProps['type'];
  delayToOpen: CardProps['delayToOpen'];
}

interface CardColorsProps {
  principal: { [key in CardType]: string };
  before: { [key in CardType]: string };
}

export const CardColors: CardColorsProps = {
  principal: {
    red: theme.colors.team.red.primary,
    blue: theme.colors.team.blue.primary,
    no_team: theme.colors.card.normal.secondary,
    game_over: theme.colors.card.gameOver.primary,
  },
  before: {
    red: theme.colors.team.red.secondary,
    blue: theme.colors.team.blue.secondary,
    no_team: theme.colors.card.normal.primary,
    game_over: theme.colors.card.gameOver.secondary,
  },
};

export type ContainerProps = StyledCardProps;
export const container = ({
  isOpen,
  cardType,
  delayToOpen,
}: ContainerProps) => {
  return {
    style: {
      backgroundColor: isOpen ? CardColors.principal[cardType] : undefined,
      transition: isOpen
        ? `background-color 0.5s ease-out ${0.5 + delayToOpen}s`
        : undefined,
    },
  };
};

export interface PercentageProps {
  team: Team;
  visible: boolean;
}
export const percentage = ({ team, visible }: PercentageProps) => {
  return {
    style: {
      visibiliy: visible ? 'hidden' : undefined,
      backgroundColor: theme.colors.team[team].primary,
    },
  };
};

export type ContentProps = StyledCardProps;
export const content = ({
  isOpen,
  revealed,
  cardType,
  delayToOpen,
}: ContentProps) => {
  return {
    style: {
      visibiliy: revealed ? 'hidden' : undefined,
      backgroundColor: isOpen ? CardColors.before[cardType] : undefined,
      transition: revealed
        ? `visibility ${0.5 + delayToOpen}s linear`
        : isOpen
        ? `background-color ${0.5 + delayToOpen}s ease-in`
        : undefined,
    },
  };
};

export type ContentTextProps = Omit<StyledCardProps, 'cardType'>;
export const contentText = ({
  isOpen,
  revealed,
  delayToOpen,
}: ContentTextProps) => {
  return {
    style: {
      visibiliy: revealed ? 'hidden' : undefined,
      color: isOpen ? theme.colors.white : undefined,
      transition: revealed
        ? `visibility ${0.5 + delayToOpen}s linear`
        : isOpen
        ? `color ${0.5 + delayToOpen}s ease-in`
        : undefined,
    },
  };
};
