import { gameStore } from "../store/gameStore";
import { socket } from "../../socket";
import { TypePlacedCard, TypePlayerRole, TypeCard, TypePlayer } from "../../types/types";

export const playerMove = (playerIndex: number, target: any) => {
  socket.emit('player move', { playerIndex: playerIndex, card: target.name})

  console.log('emitted ', { playerIndex: playerIndex, card: target.name});
};

export const checkIfAvailable = (playerIndex: number, card: TypeCard): boolean => {
  const players = gameStore.players as Array<TypePlayer>
  const placedCards = gameStore.placedCards as Array<TypePlacedCard>
  if (players[playerIndex].playerRole === TypePlayerRole.Attacker && placedCards[0]) {
    return !!placedCards.findIndex(placedCard => {
     return card.rank === placedCard.attacker.rank || card.rank === placedCard.defender!.rank
    })
  } else if (players[playerIndex].playerRole === TypePlayerRole.Attacker && placedCards.length === 0) {
    return true;
  } else if (players[playerIndex].playerRole === TypePlayerRole.Defender && placedCards[placedCards.length - 1]) {
    return card.rank > placedCards[placedCards.length - 1].attacker.rank || card.isTrump;
  }
  return false;
}