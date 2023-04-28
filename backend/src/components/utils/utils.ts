import { gameStore, gameStoreWithHistory } from '../store/gameStore.mjs';
// import { subscribe, useSnapshot } from "valtio/vanilla";
import {
  TypeCard,
  TypePlacedCard,
  TypeGameStatus,
  TypePlayerRole,
  TypePlayerStatus,
  TypePlayer,
  TypeCardRank,
  TypeCardSuit,
  TypeGameStore,
  TypeAction
} from "../types/types.mjs";
// import { MaskedFrame } from "@pixi/ui";

const MAX_CARDS_IN_HAND = 6;

export const startGame = (playerIndex: number) => {
  gameStore.gameStatus = TypeGameStatus.DrawingCards;
  // giveCards(playerIndex);
}

export const createDeck = () => {
  const cards:Array<TypeCard> = [];
  let trump: TypeCard

  const ranks: TypeCardRank[] = [
    TypeCardRank.RANK_6,
    TypeCardRank.RANK_7,
    TypeCardRank.RANK_8,
    TypeCardRank.RANK_9,
    TypeCardRank.RANK_10,
    TypeCardRank.RANK_J,
    TypeCardRank.RANK_Q,
    TypeCardRank.RANK_K,
    TypeCardRank.RANK_A,
  ];

  const suits: TypeCardSuit[] = [
    TypeCardSuit.Clubs, // ♣
    TypeCardSuit.Diamonds, // ♠
    TypeCardSuit.Hearts, // ♥
    TypeCardSuit.Spades, // ♦
  ];

  for (const suit of suits) {
    for (const rank of ranks) {
      const name = suit.slice(0, 1).concat(rank.toString())
      const card = { name: name, rank: rank, suit: suit, isTrump: false } as TypeCard;
      cards.push(card);
    }
  }

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const randomCardIdx = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomCardIdx]] = [cards[randomCardIdx], cards[i]];
  }

  trump = cards[cards.length - 1];

  for (const card of cards) {
    if (card.suit === trump.suit) {
      card.isTrump = true;
    }
  }

  gameStore.deckCards = cards;
}


export const giveCards = () => {
  const attacker = gameStore.players.filter(player => player.playerRole === TypePlayerRole.Attacker)[0];
  const defender = gameStore.players.filter(player => player.playerRole === TypePlayerRole.Defender)[0];
    const length1 = attacker.cards.length;
    const length2 = defender.cards.length;
    const minHand = Math.min(length1, length2)
    for (let i = 0; i < MAX_CARDS_IN_HAND - minHand; i++) {
      if (gameStore.deckCards[0]) {
        if (length1 < MAX_CARDS_IN_HAND)
          attacker.cards.push(gameStore.deckCards.shift()!);
      }
      if (gameStore.deckCards[0]) {
        if (length2 < MAX_CARDS_IN_HAND)
          defender.cards.push(gameStore.deckCards.shift()!)
      }
    }
  gameStore.gameStatus = TypeGameStatus.GameInProgress
  console.log('subs draw')
}

export const makePlayerMove = (playerIndex: number, cardName: string) => {
  const cardIndex: number = gameStore.players[playerIndex].cards.indexOf(gameStore.players[playerIndex].cards.filter(card => card.name === cardName as string)[0]);
  const card: TypeCard = gameStore.players[playerIndex].cards.splice(cardIndex, 1)[0] as TypeCard;
  if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Attacker) {
    makeAttackingMove(playerIndex, card);
  } else if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Defender) {
    makeDefendingMove(playerIndex, card);
  }
}

const makeAttackingMove = (playerIndex: number, card: TypeCard) => {
  console.log('start att move')
  const placedCard = { attacker:card } as TypePlacedCard
  gameStore.placedCards.push(placedCard);
  gameStore.lastAction = TypeAction.AttackerMoveCard
  console.log(gameStore.placedCards)
}

const makeDefendingMove = (playerIndex: number, card: TypeCard) => {
  console.log('check def')
  if (typeof(gameStore.placedCards[gameStore.placedCards.length - 1].defender) !== 'undefined') {
    console.log('start def move')
    // const placedCard = { defender:card } as TypePlacedCard
    gameStore.placedCards[gameStore.placedCards.length - 1].defender = card;
    gameStore.lastAction = TypeAction.DefenderMoveCard
  }
}

export const undoGameStore = (playerIndex: number) => {
  //is not working:
  // gameStoreWithHistory.undo();

  //is working
  const lastSnapshot = gameStoreWithHistory.history.snapshots[gameStoreWithHistory.history.index- 1] as TypeGameStore;
    gameStore.players[0].cards = [...lastSnapshot.players[0].cards!];
    gameStore.players[1].cards = [...lastSnapshot.players[1].cards!];
    console.log(gameStore.players[0].cards)
    console.log(gameStore.players[1].cards)

  if (gameStore.placedCards) {
    gameStore.placedCards = lastSnapshot.placedCards;
    console.log(gameStore.placedCards);
  }
}

// export const sortPlayerCards = (player: number, type: string) => {
//   switch (type) {
//     case 'byRank':
//       gameStore.players[player - 1].cards.sort((a,b) => Number(a.rank) - Number(b.rank));
//       break;
//     case 'bySuit':
//       gameStore.players[player - 1].cards
//         .sort((a,b) => a.rank - b.rank)
//         .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
//       break;
//     default:
//       break;
//   }
// }