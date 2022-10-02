import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useOutletContext } from 'react-router';
import { Client as ClientTMI } from 'tmi.js';

import { Status } from 'components/Info/Lobby/styles';
import { shuffleArray } from 'helpers/shuffleArray';
import { useGame } from 'hooks/useGame';
import { CardProps, CardType, Team } from 'interfaces/Card';

import Card from './Card';

import * as S from './styles';

interface VoteProps {
  title: CardProps['title'];
  type: CardProps['type'];
  votes: CardProps['votes'];
}

const Board: React.FC = () => {
  const { words, username } = useOutletContext<{
    words: string[];
    username: string | null;
  }>();
  const game = useGame();

  const finishedByGameOver = useRef<boolean>(false);
  const [client, setClient] = useState<ClientTMI | null>(null);

  const [amount, setAmount] = useState<number>(0);
  const [animateTitle, setAnimateTitle] = useState<boolean>(false);
  const [cardsWithVotes, setCardsWithVotes] = useState<VoteProps[]>([]);

  //

  const disconnectClient = () => {
    void (async () => {
      try {
        await client?.disconnect();

        setClient(null);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  //

  const handleOpenAllCards = () => {
    game.handleCards((oldState) =>
      oldState.map((oldCard) => ({
        ...oldCard,
        isOpen: true,
        votes: 0,
      }))
    );
  };

  const handleOnFinishTurn = (
    cardsOpened: number,
    openedOtherTeam: number,
    isGameOver: boolean
  ) => {
    game.handleIsStreamerTurn(true);
    let {
      remaining: { red, blue },
    } = game.history;
    const nextTeam = game.team === Team.RED ? Team.BLUE : Team.RED;

    if (game.team === Team.RED) {
      red -= cardsOpened;
      blue -= openedOtherTeam;
    } else {
      red -= openedOtherTeam;
      blue -= cardsOpened;
    }

    game.handleHistory((oldState) => ({
      remaining: {
        red,
        blue,
      },
      clues: [
        ...oldState.clues,
        {
          team: game.team,
          description: game.clue!.description,
          amount: game.clue!.amount,
        },
      ],
    }));

    if (isGameOver || red === 0 || blue === 0) {
      if (isGameOver) {
        game.handleWinner(nextTeam);
      } else {
        game.handleWinner(red === 0 ? Team.RED : Team.BLUE);
        handleOpenAllCards();
      }
      game.handleStatus(Status.FINISH_GAME);
      game.handleTeam(nextTeam);
      game.reset();
      disconnectClient();
    } else {
      game.handleClue(null);
      game.handleTeam(nextTeam);
    }
  };

  const handleOpen = () => {
    let opened = 0;
    let openedOtherTeam = 0;
    let isGameOver = false;
    let newCards = [...game.cards];
    const cardsToOpen = cardsWithVotes
      .sort((a, b) => b.votes - a.votes)
      .slice(0, game.clue!.amount);

    let delayToOpen = 0;
    for (const { title, type } of cardsToOpen) {
      if (type === CardType.GAME_OVER) {
        newCards = newCards.map((oldCard) => ({
          ...oldCard,
          isOpen: true,
          votes: 0,
          delayToOpen: oldCard.type === CardType.GAME_OVER ? 0 : 0.5,
        }));
        isGameOver = true;
        break;
      } else {
        newCards = newCards.map((oldCard) => {
          if (oldCard.title === title) {
            delayToOpen += 0.1;
            return {
              ...oldCard,
              isOpen: true,
              revealed: true,
              votes: 0,
              delayToOpen,
            };
          }
          return { ...oldCard, votes: 0 };
        });

        if (
          (game.team === Team.RED && type === CardType.RED) ||
          (game.team === Team.BLUE && type === CardType.BLUE)
        ) {
          opened += 1;
        } else {
          if (
            (game.team === Team.RED && type === CardType.BLUE) ||
            (game.team === Team.BLUE && type === CardType.RED)
          ) {
            openedOtherTeam += 1;
          }

          break;
        }
      }
    }

    finishedByGameOver.current = isGameOver;
    setCardsWithVotes([]);
    game.handleTotalVotes(0);
    game.handleCards(newCards);
    handleOnFinishTurn(opened, openedOtherTeam, isGameOver);
  };

  const handleVote = (message: string, userTeam: Team | null) => {
    if (userTeam === game.team && game.isTimerRunning) {
      const lowerCase = message.toLowerCase();
      let type: CardType;

      game.handleTotalVotes((oldState) => oldState + 1);
      game.handleCards((oldState) =>
        oldState.map((oldCard) => {
          if (oldCard.title === lowerCase) {
            type = oldCard.type;
            return { ...oldCard, votes: oldCard.votes + 1 };
          }
          return oldCard;
        })
      );

      const filter = cardsWithVotes.filter((item) => item.title === lowerCase);
      if (filter.length === 0) {
        setCardsWithVotes((oldState) => [
          ...oldState,
          { title: lowerCase, type, votes: 1 },
        ]);
      } else {
        setCardsWithVotes((oldState) =>
          oldState.map((oldCard) => {
            if (oldCard.title === lowerCase) {
              return { ...oldCard, votes: oldCard.votes + 1 };
            }
            return oldCard;
          })
        );
      }
    }
  };

  //

  const renderTitle = () => {
    let message = 'Aguardando a dica da(o) streamer';
    if (game.winner) {
      message = `O time ${
        game.winner === Team.RED ? 'vermelho' : 'azul'
      } venceu`;
    }
    return (
      <S.Title
        className={animateTitle ? 'animateTitle' : ''}
        onAnimationEnd={() => setAnimateTitle(false)}
      >
        {message}
      </S.Title>
    );
  };

  //

  const getAmount = useCallback(() => {
    if (game.clue !== null) {
      setAnimateTitle(true);
      if (game.isTimerRunning) {
        setAmount(game.clue.amount);
      } else {
        handleOpen();
      }
    }
  }, [game.clue, game.isTimerRunning]);

  const initClient = useCallback(() => {
    if (username && client === null) {
      const init = async () => {
        try {
          const _client = new ClientTMI({
            channels: [username],
          });

          await _client.connect();

          _client.on('message', (_, __, message) => {
            // conferir se está em uma equipe
            // conferir se está no turno da equipe dele
            handleVote(message, Team.RED);
          });

          setClient(_client);
        } catch (error) {
          console.error(error);
        }
      };
      void init();
    }
  }, [username]);

  const initCards = useCallback(() => {
    if (game.cards.length === 0) {
      const getType = (value: number) => {
        if (value < game.amount.red) {
          return CardType.RED;
        }
        if (value < game.amount.red + game.amount.blue) {
          return CardType.BLUE;
        }
        if (value < 24) {
          return CardType.NO_TEAM;
        }
        return CardType.GAME_OVER;
      };

      const cardsFromWords: CardProps[] = words.map((item, index) => ({
        id: index,
        title: item,
        isOpen: false,
        revealed: false,
        type: getType(index),
        votes: 0,
        delayToOpen: 0,
      }));

      const shuffled = shuffleArray(cardsFromWords);

      game.handleCards(shuffled);
    }
  }, [words, game.cards]);

  useEffect(() => {
    getAmount();
  }, [getAmount]);

  useEffect(() => {
    initClient();
  }, [initClient]);

  useEffect(() => {
    initCards();
  }, [initCards]);

  return (
    <S.Container>
      <S.Header>
        {game.clue !== null ? (
          <>
            <S.Clue>{game.clue.description}</S.Clue>
            <S.Amount>{amount}</S.Amount>
          </>
        ) : (
          renderTitle()
        )}
      </S.Header>
      <S.Content>
        {game.cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            team={game.team}
            totalVotes={game.totalVotes}
            isStreamerTurn={game.clue === null}
            onOpen={() => {
              //
            }}
          />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Board;
