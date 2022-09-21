export enum CardStatus {
  UNOPEN = 'UNOPEN',
  RED_TEAM = 'RED_TEAM',
  BLUE_TEAM = 'BLUE_TEAM',
  WRONG = 'WRONG',
  GAME_OVER = 'GAME_OVER',
}

export interface Cards {
  id: number;
  title: string;
  status: CardStatus;
}
