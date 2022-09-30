import React from 'react';

import { Status } from 'interfaces/Status';

import Game, { GameProps, HistoryProps } from './Game';
import Lobby, { LobbyProps } from './Lobby';

export type { HistoryProps };

type Props = GameProps & LobbyProps;

const Info: React.FC<Props> = ({
  isStreamerTurn,
  team,
  history,
  type,
  username,
  seconds,
  onFinishTimer,
  onChangeSeconds,
}) => {
  return type === Status.GAME ? (
    <Game
      isStreamerTurn={isStreamerTurn}
      team={team}
      history={history}
      seconds={seconds}
      onFinishTimer={onFinishTimer}
    />
  ) : (
    <Lobby
      type={type}
      username={username}
      seconds={seconds}
      onChangeSeconds={onChangeSeconds}
    />
  );
};

export default Info;
