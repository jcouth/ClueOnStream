import React, { useCallback, useEffect, useState } from 'react';

import { shuffleArray } from 'helpers/shuffleArray';
import { OnMessageCallback, useGame } from 'hooks/useGame';
import { CardProps, CardType, Team } from 'interfaces/Card';
import { Status } from 'interfaces/Status';

import Card from './Card';

import * as S from './styles';

interface Props {
  words: string[];
}

const Board: React.FC<Props> = ({ words }) => {
  const game = useGame();

  const [amount, setAmount] = useState<number>(0);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [animateTitle, setAnimateTitle] = useState<boolean>(false);

  //

  const disconnectClient = () => {
    // void (async () => {
    //   try {
    //     await client?.disconnect();
    //     setClient(null);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  };

  //

  const handleOpenAllCards = () => {
    setCards((oldState) =>
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
    let newCards = [...cards];
    const cardsToOpen = cards
      .filter((card) => card.votes > 0)
      .sort((a, b) => b.votes - a.votes)
      .slice(0, game.clue!.amount);

    let delayToOpen = 0;
    for (const { title, type } of cardsToOpen) {
      if (type === CardType.GAME_OVER) {
        newCards = newCards.map((oldCard) => ({
          ...oldCard,
          isOpen: true,
          revealed: oldCard.title === title || oldCard.revealed,
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

    setTotalVotes(0);
    setCards(newCards);
    handleOnFinishTurn(opened, openedOtherTeam, isGameOver);
  };

  const handleVote = (message: string, userTeam: Team | null) => {
    if (userTeam === game.team && game.isTimerRunning) {
      const lowerCase = message.toLowerCase();

      setTotalVotes((oldState) => oldState + 1);
      setCards((oldState) =>
        oldState.map((oldCard) => {
          if (oldCard.title === lowerCase) {
            return { ...oldCard, votes: oldCard.votes + 1 };
          }
          return oldCard;
        })
      );
    }
  };

  const callback: OnMessageCallback = (_, __, message) => {
    handleVote(message, Team.RED);
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

  const initClientListener = useCallback(() => {
    if (game.client && game.isTimerRunning) {
      game.client.addListener('message', callback);
    }
  }, [game.client, game.isTimerRunning]);

  const initCards = useCallback(() => {
    if (words.length > 0) {
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

      setCards(shuffled);
    }
  }, [words]);

  useEffect(() => {
    getAmount();
  }, [getAmount]);

  useEffect(() => {
    initClientListener();

    return () => {
      if (game.client) {
        game.client.removeListener('message', callback);
      }
    };
  }, [initClientListener]);

  useEffect(() => {
    initCards();
  }, [initCards]);

  return (
    <S.Container>
      {/* <Modal
        title="Você tem certeza?"
        subtitle="Se você confirmar este jogo será abandonado e os pontos serão devolvidos para o chat"
        onCancel={() => {
          //
        }}
        onConfirm={() => {
          //
        }}
      /> */}
      <S.Header>
        {game.clue !== null && game.status === Status.GAME ? (
          <>
            <S.Clue>{game.clue.description}</S.Clue>
            <S.Amount>{amount}</S.Amount>
          </>
        ) : (
          renderTitle()
        )}
      </S.Header>
      <S.Content>
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            team={game.team}
            totalVotes={totalVotes}
            isStreamerTurn={game.isStreamerTurn}
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
