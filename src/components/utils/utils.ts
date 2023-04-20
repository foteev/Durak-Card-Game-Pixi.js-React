import { gameStore } from "../store/gameStore";
import { subscribe, useSnapshot } from "valtio";
import { 
  TypeCard,
  TypePlacedCard,
  TypeGameStatus,
  TypePlayerRole,
  TypePlayerStatus,
} from "../../types/types";
import { CardComponent } from "../GameStage/GameStage";
import { MaskedFrame } from "@pixi/ui";

export const startGame = () => {
  gameStore.gameStatus = TypeGameStatus.DrawingCards;
  giveCardsOnStart();
}

export function giveCardsOnStart() {
  console.log('sub start')
  if (gameStore.gameStatus === TypeGameStatus.DrawingCards) {
    for (let i = 0; i <= 11; i++) {
      if (i % 2 === 0) {
        // if (gameStore.deckCards[0]) {
          gameStore.players[0].cards.push(gameStore.deckCards.shift()!);
        // } else {
          gameStore.players[1].cards.push(gameStore.deckCards.shift()!);
        // }
      }
    }
  }
  gameStore.gameStatus = TypeGameStatus.GameInProgress
  console.log('subs draw')
}

export const makePlayer1Move = (card: typeof CardComponent) => {
  if (gameStore.players[0].playerRole === TypePlayerRole.Attacker) {
    makeAttackingMove1(card.name);
    console.log('attack done')
  } else if (gameStore.players[0].playerRole === TypePlayerRole.Defender) {
    makeDefendingMove1(card.name);
    console.log('defend done')
  }
}

const makeAttackingMove1 = (cardName: string) => {
  console.log('start move')
  const cardIndex: number = gameStore.players[0].cards.indexOf(gameStore.players[0].cards.filter(card => card.name === cardName as string)[0]);
  const card: TypeCard = gameStore.players[0].cards.splice(cardIndex, 1)[0] as TypeCard;
  const placedCard = { attacker:card } as TypePlacedCard
  gameStore.placedCards = [...gameStore.placedCards!, placedCard];
  console.log(gameStore.placedCards)
  console.log(gameStore.players[0].cards)
  gameStore.players[0].playerRole = TypePlayerRole.Defender;
}

const makeDefendingMove1 = (cardName: string) => {
  console.log('start move')
  const cardIndex: number = gameStore.players[0].cards.indexOf(gameStore.players[0].cards.filter(card => card.name === cardName as string)[0]);
  const card: TypeCard = gameStore.players[0].cards.splice(cardIndex, 1)[0] as TypeCard;
  const placedCard = { defender:card } as TypePlacedCard
  gameStore.placedCards = [...gameStore.placedCards!, placedCard];
  console.log(gameStore.placedCards)
  console.log(gameStore.players[0].cards)
  gameStore.players[0].playerRole = TypePlayerRole.Attacker;
}

export const sortPlayerCards = (player: number, type: string) => {
  switch (type) {
    case 'byRank':
      gameStore.players[player - 1].cards.sort((a,b) => Number(a.rank) - Number(b.rank));
      break;
    case 'bySuit':
      gameStore.players[player - 1].cards
        .sort((a,b) => a.rank - b.rank)
        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      break;
    default:
      break;
  }
}