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

export const makePlayerMove = (playerIndex: number, card: typeof CardComponent) => {

  if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Attacker) {
    makeAttackingMove(playerIndex, card.name);
  } else if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Defender) {
    makeDefendingMove(playerIndex, card.name);

  }
}

const makeAttackingMove = (playerIndex: number, cardName: string) => {
  console.log('start att move')
  const cardIndex: number = gameStore.players[playerIndex].cards.indexOf(gameStore.players[playerIndex].cards.filter(card => card.name === cardName as string)[0]);
  const card: TypeCard = gameStore.players[playerIndex].cards.splice(cardIndex, 1)[0] as TypeCard;
  const placedCard = { attacker:card } as TypePlacedCard
  gameStore.placedCards.push(placedCard);
  console.log(gameStore.placedCards)
}

const makeDefendingMove = (playerIndex: number, cardName: string) => {
  if (!gameStore.placedCards[gameStore.placedCards.length - 1].defender) {
    console.log('start def move')
    const cardIndex: number = gameStore.players[playerIndex].cards.indexOf(gameStore.players[playerIndex].cards.filter(card => card.name === cardName as string)[0]);
    const card: TypeCard = gameStore.players[playerIndex].cards.splice(cardIndex, 1)[0] as TypeCard;
    // const placedCard = { defender:card } as TypePlacedCard
    gameStore.placedCards[gameStore.placedCards.length - 1].defender = card;
  }

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