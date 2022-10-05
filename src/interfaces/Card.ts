export enum Team {
  RED = 'red',
  BLUE = 'blue',
}

export enum CardType {
  RED = 'red',
  BLUE = 'blue',
  NO_TEAM = 'no_team',
  GAME_OVER = 'game_over',
}

export interface CardProps {
  id: number;
  title: string;
  isOpen: boolean;
  revealed: boolean;
  type: CardType;
  votes: number;
  delayToOpen: number;
}

export interface ObjectCardProps {
  [key: string]: CardProps;
}
