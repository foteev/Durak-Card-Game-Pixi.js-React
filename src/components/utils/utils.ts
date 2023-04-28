import { gameStore } from "../store/gameStore";
import { socket } from "../../socket";
import { TypePlacedCard, TypePlayerRole, TypeCard, TypePlayer } from "../../types/types";

export const playerMove = (playerIndex: number, target: any) => {
  if (checkIfAvailable(playerIndex, target.name)) {
    socket.emit('player move', { playerIndex: playerIndex, card: target.name})
    console.log('emitted ', { playerIndex: playerIndex, card: target.name});
  }
};

export const checkIfAvailable = (playerIndex: number, card: TypeCard): boolean => {
  const players = gameStore.players as Array<TypePlayer>
  const placedCards = gameStore.placedCards as Array<TypePlacedCard>
  console.log(placedCards[0])
  if (players[playerIndex].playerRole === TypePlayerRole.Attacker && placedCards.length !== 0) {
    return !!placedCards.findIndex(placedCard => {

       return card.rank === placedCard.attacker.rank
    })
  } else if (players[playerIndex].playerRole === TypePlayerRole.Attacker && placedCards.length === 0) {
    return true;
  } else if (players[playerIndex].playerRole === TypePlayerRole.Defender && placedCards.length !== 0) {
    return checkCardRank(card);
  }
  return false;
}

const checkCardRank = (playerCard: TypeCard): boolean => {
    const placedCards = gameStore.placedCards as Array<TypePlacedCard>;

    if (placedCards.length !== 0) {
      const placedCard = gameStore.placedCards[placedCards.length - 1].attacker as TypeCard;

      if (
        playerCard.rank > placedCard.rank
        || (playerCard.isTrump && !placedCard.isTrump)
      ) return true;
    }
  return false;
}