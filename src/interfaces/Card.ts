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

export interface Card {
  id: number;
  title: string;
  isOpen: boolean;
  type: CardType;
}
