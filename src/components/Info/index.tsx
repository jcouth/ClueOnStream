import React from 'react';

import { Status } from '../../interfaces/Status';

import Lobby, { LobbyProps } from './Lobby';
import Game, { GameProps, HistoryProps } from './Game';

export type { HistoryProps };

type Props = GameProps & LobbyProps;

const Info: React.FC<Props> = ({
  isStreamerTurn,
  team,
  history,
  type,
  username,
  onFinishTimer,
  onChangeSeconds,
}) => {
  return type === Status.GAME ? (
    <Game
      isStreamerTurn={isStreamerTurn}
      team={team}
      history={history}
      onFinishTimer={onFinishTimer}
    />
  ) : (
    <Lobby type={type} username={username} onChangeSeconds={onChangeSeconds} />
  );
};

export default Info;
