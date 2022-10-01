import React, { useEffect, useRef, useState } from 'react';

import { Client as ClientTMI } from 'tmi.js';
import { Outlet } from 'react-router';

import Info from 'components/Info';
import Board from 'components/Board';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';
import { fetchVerbs } from 'services/words/api';
import { fetchUser } from 'services/twitch/api';

import * as S from './styles';

const InGame: React.FC = () => {
  /*
  [ok] título não sair do card
  [ok] animação abrir cards
  [ok] background-image pegar a url do local path
  [ok] manter proporção quando redimensionar
  [ok] onWin
  abrir todo os cards que tiverem a mesma votação
  integrar com a twitch
  
  fonte carregar do local path
  evitar rerender quando redimensionar
  animação transição de layouts
  limpar codigo
  performance
  */
  const {
    team,
    amount: { max },
    status,
    handleStatus,
  } = useGame();

  const allWords = useRef<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [username, setUsername] = useState<string | null>(null);
  const [client, setClient] = useState<ClientTMI | null>(null);

  const handleConnect = async (token: string) => {
    try {
      const { data } = await fetchUser(token);
      const [userData] = data.data;

      const _client = new ClientTMI({
        // options: { debug: true },
        // identity: {
        //   username: 'ClueOnStream',
        //   password: 'oauth:kt2w01vfqtm6rkmm7b1ru7ra23xvmo',
        // },
        channels: [userData.display_name],
      });

      await _client.connect();

      setUsername(userData.display_name);
      setClient(_client);
      // setGameStatus(Status.WAITING_START);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    // void (async () => {
    //   try {
    //     await client?.disconnect();
    //     // await logout();
    //     setUsername(null);
    //     setClient(null);
    //     setGameStatus(Status.WAITING_CONNECTION);
    //     setSeconds(5);
    //     resetGame();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  };

  const handleNewGame = () => {
    try {
      // ADD loading

      const shuffled = shuffleArray(allWords.current);
      const newWords = shuffled.slice(0, max);

      setWords(newWords);
      handleStatus(Status.WAITING_TEAMS);

      setTimeout(() => {
        handleStatus(Status.GAME);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const getVerbs = async () => {
    try {
      const { data } = await fetchVerbs();

      allWords.current = data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (document.location.hash && document.location.hash !== '') {
      const parsedHash = new URLSearchParams(window.location.hash.slice(1));
      if (parsedHash.get('access_token')) {
        const accessToken = parsedHash.get('access_token');
        const state = parsedHash.get('state');

        console.log(
          '@ClueOnStream::twitch_state',
          localStorage.getItem('@ClueOnStream::twitch_state')
        );

        if (
          accessToken &&
          state === localStorage.getItem('@ClueOnStream::twitch_state')
        ) {
          void handleConnect(accessToken);

          // if (allWords.current.length === 0) {
          //   void getVerbs();
          // }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (client) {
      // console.log(client);
      // const init = async () => {
      //   client.on('message', (channel, tags, message, self) => {
      //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      //     console.log(`${tags['display-name']}: ${message}`);
      //     // // Ignore echoed messages.
      //     // if (self) return;
      //     // if (message.toLowerCase() === '!hello') {
      //     //   // "@alca, heya!"
      //     //   void client.say(channel, `@${tags.username ?? 'teste'}, heya!`);
      //     // }
      //   });
      // };
      // void init();
    }
  }, [client]);

  return (
    <S.Container>
      <S.Content inLobby={status !== Status.GAME} team={team}>
        <S.Aside>
          <Info username={username} status={status} />
          <Cam onDisconnect={handleDisconnect} onNewGame={handleNewGame} />
        </S.Aside>
        <S.Main>
          {status === Status.GAME || status === Status.FINISH_GAME ? (
            <Board words={words} />
          ) : (
            <Outlet />
          )}
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
