import React, { useEffect, useRef, useState } from 'react';

import { Client as ClientTMI } from 'tmi.js';
import { Outlet, Routes, Route, useNavigate } from 'react-router';

import Lobby from 'components/Info/Lobby';
import Game from 'components/Info/Game';
import Cam from 'components/Cam';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { Status } from 'interfaces/Status';
import { fetchVerbs } from 'services/words/api';
import { fetchUser, logout } from 'services/twitch/api';

import * as S from './styles';

const InGame: React.FC = () => {
  /*
  [ok] título não sair do card
  [ok] animação abrir cards
  [ok] background-image pegar a url do local path
  [ok] manter proporção quando redimensionar
  [ok] onWin
  [ok] integrar com a twitch
  separar equipes pelo prediction
  
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
    handleSeconds,
    reset,
  } = useGame();
  const navigate = useNavigate();

  const allWords = useRef<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const [token, setToken] = useState<string>('');
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

      setToken(token);
      setUsername(userData.display_name);
      setClient(_client);
      handleStatus(Status.WAITING_START);

      await _client.connect();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    void (async () => {
      try {
        await logout(token);
        await client?.disconnect();

        setUsername(null);
        setClient(null);
        handleStatus(Status.WAITING_CONNECTION);
        handleSeconds(5);
        reset();

        navigate('/');
      } catch (error) {
        console.error(error);
      }
    })();
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

        navigate('/game');
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

        if (
          accessToken &&
          state === localStorage.getItem('@ClueOnStream::twitch_state')
        ) {
          void handleConnect(accessToken);

          if (allWords.current.length === 0) {
            void getVerbs();
          }
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
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Lobby username={username} />} />
          </Routes>
          <Cam onDisconnect={handleDisconnect} onNewGame={handleNewGame} />
        </S.Aside>
        <S.Main>
          <Outlet context={{ words }} />
        </S.Main>
      </S.Content>
    </S.Container>
  );
};

export default InGame;
