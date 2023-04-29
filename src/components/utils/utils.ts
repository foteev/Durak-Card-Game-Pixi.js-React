import { gameStore } from "../store/gameStore";
import { socket } from "../../socket";
import { TypePlacedCard, TypePlayerRole, TypeCard, TypePlayer, TypeGameStatus, TypeGameStore } from "../../types/types";
import { snapshot } from "valtio/vanilla";

export const playerMove = (playerIndex: number, target: any) => {
  const card = gameStore.players[playerIndex].cards.filter((c: TypeCard) => c.name === target.name)[0];
  if (checkIfAvailable(playerIndex, card)) {
    socket.emit('player move', { playerIndex: playerIndex, card: target.name})
  }
};

export const checkIfAvailable = (playerIndex: number, card: TypeCard): boolean => {
  if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Attacker && gameStore.placedCards.length !== 0) {
    let count = 0;
    gameStore.placedCards.forEach((placedCard: TypePlacedCard) => {
      if (placedCard.attacker.rank === card.rank) {
        count++
      }
      if (placedCard.defender) {
        if (placedCard.defender.rank === card.rank) {
          count++
        }
      }
    })
    return Boolean(count);
    
  } else if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Attacker && gameStore.placedCards.length === 0) {
    return true;
  } else if (gameStore.players[playerIndex].playerRole === TypePlayerRole.Defender && gameStore.placedCards.length !== 0) {
    return checkCardRank(card);
  } else return false;
}

const checkCardRank = (playerCard: TypeCard): boolean => {


  const placedCards = gameStore.placedCards as Array<TypePlacedCard>
    if (placedCards.length !== 0) {
      let count = 0;
      placedCards.forEach((placedCard) => {
        if (placedCard.defender === undefined) {
          if ((playerCard.rank > placedCard.attacker.rank && playerCard.suit === placedCard.attacker.suit)
            || (playerCard.isTrump && !placedCard.attacker.isTrump)) {
              count++;
          }

        }
      })
      return Boolean(count);
    }
  return false;
}