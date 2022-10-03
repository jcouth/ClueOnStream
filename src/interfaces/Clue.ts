import { Team } from './Card';

export interface ClueProps {
  description: string;
  amount: number;
}

type RemainingProps = { [key in Team]: number };

interface HistoryClueProps extends ClueProps {
  team: Team;
}

export interface HistoryProps {
  remaining: RemainingProps;
  clues: HistoryClueProps[];
}
