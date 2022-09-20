export enum CardStatus {
  UNOPEN = 'UNOPEN',
  OPEN = 'OPEN',
  WRONG = 'WRONG',
  GAME_OVER = 'GAME_OVER',
}

export interface Cards {
  id: number;
  title: string;
  status: CardStatus;
}
