import React from 'react';

import { Status } from 'interfaces/Status';

import Game, { HistoryProps } from './Game';
import Lobby, { LobbyProps } from './Lobby';

export type { HistoryProps };

type Props = LobbyProps & { status: Status };

const Info: React.FC<Props> = ({ username, status }) => {
  return status === Status.GAME ? <Game /> : <Lobby username={username} />;
};

export default Info;
