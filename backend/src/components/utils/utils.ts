import { gameStore } from '../store/gameStore.mjs';
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


export const giveCards = (playerIndex: number) => {
  console.log('sub start')
  const player = gameStore.players[playerIndex] as TypePlayer;
  const otherPlayer = gameStore.players.find(playerX => playerX !== player) as TypePlayer;
  if (gameStore.gameStatus === TypeGameStatus.DrawingCards) {
    const minHand = Math.min(player.cards.length, otherPlayer.cards.length)
    const length1 = player.cards.length;
    const length2 = otherPlayer.cards.length;

    // const minCardsPlayer = player1Length > player2Length ? 
    // if (length1 < MAX_CARDS_IN_HAND && length1) {
    //   if (player2Length < MAX_CARDS_IN_HAND) {
    for (let i = 0; i < MAX_CARDS_IN_HAND - minHand; i++) {
      if (gameStore.deckCards[0] !== undefined) {
        if (length1 < MAX_CARDS_IN_HAND)
          player.cards.push(gameStore.deckCards.shift()!);
        if (length2 < MAX_CARDS_IN_HAND)
          otherPlayer.cards.push(gameStore.deckCards.shift()!)
      }
    }

  }
  gameStore.gameStatus = TypeGameStatus.GameInProgress
  console.log('subs draw')
}
    //     }
    //   } else
    //     for (let i = 0; i < MAX_CARDS_IN_HAND - player1Length; i++) {
    //       player.cards.push(gameStore.deckCards.shift()!);
    //   }

    //   // if (player.playerRole === TypePlayerRole.Attacker)
    //   if (gameStore.deckCards[0]) {
    //     for (let i = 0; i < gameStore.deckCards.length; i++) {
    //       if (i < player1Length && gameStore.deckCards[1]) {

    //       } else player.cards.push(gameStore.deckCards.shift()!)
    //     }
    //   }
    // }
    // for (let i = 0; i <= 11; i++) {
    //   if (i % 2 === 0) {
    //     // if (gameStore.deckCards[0]) {
    //       gameStore.players[0].cards.push(gameStore.deckCards.shift()!);
    //     // } else {
    //       gameStore.players[1].cards.push(gameStore.deckCards.shift()!);
    //     // }
    //   }
    // }


// export const makePlayerMove = (playerIndex: number, card: TypeCard) => {

//   if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Attacker) {
//     makeAttackingMove(playerIndex, card.name);
//   } else if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Defender) {
//     makeDefendingMove(playerIndex, card.name);

//   }
// }

// const makeAttackingMove = (playerIndex: number, cardName: string) => {
//   console.log('start att move')
//   const cardIndex: number = gameStore.players[playerIndex].cards.indexOf(gameStore.players[playerIndex].cards.filter(card => card.name === cardName as string)[0]);
//   const card: TypeCard = gameStore.players[playerIndex].cards.splice(cardIndex, 1)[0] as TypeCard;
//   const placedCard = { attacker:card } as TypePlacedCard
//   gameStore.placedCards.push(placedCard);
//   console.log(gameStore.placedCards)
// }

// const makeDefendingMove = (playerIndex: number, cardName: string) => {
//   if (!gameStore.placedCards[gameStore.placedCards.length - 1].defender) {
//     console.log('start def move')
//     const cardIndex: number = gameStore.players[playerIndex].cards.indexOf(gameStore.players[playerIndex].cards.filter(card => card.name === cardName as string)[0]);
//     const card: TypeCard = gameStore.players[playerIndex].cards.splice(cardIndex, 1)[0] as TypeCard;
//     // const placedCard = { defender:card } as TypePlacedCard
//     gameStore.placedCards[gameStore.placedCards.length - 1].defender = card;
//   }

// }

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