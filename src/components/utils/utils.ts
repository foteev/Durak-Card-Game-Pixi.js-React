import { gameStore } from "../store/gameStore";
import { socket } from "../../socket";
import { TypePlacedCard, TypePlayerRole, TypeCard, TypePlayer } from "../../types/types";

export const playerMove = (playerIndex: number, target: any) => {
  console.log(checkIfAvailable(playerIndex, target.name))
  const card = gameStore.players[playerIndex].cards.filter((c: TypeCard) => c.name === target.name)[0];
  console.log(target)
  if (checkIfAvailable(playerIndex, card)) {
    socket.emit('player move', { playerIndex: playerIndex, card: target.name})
    console.log('emitted ', { playerIndex: playerIndex, card: target.name});
  }
};

export const checkIfAvailable = (playerIndex: number, card: TypeCard): boolean => {
  const players = gameStore.players as Array<TypePlayer>
  const placedCards = gameStore.placedCards as Array<TypePlacedCard>
  console.log(placedCards)
  console.log(gameStore.players[playerIndex].playerRole)
  if (players[playerIndex].playerRole === TypePlayerRole.Attacker && placedCards.length !== 0) {
    return placedCards.some(placedCard =>
      card.rank === placedCard.attacker.rank
    )
  } else if (players[playerIndex].playerRole === TypePlayerRole.Attacker && placedCards.length === 0) {
    return true;
  } else if (players[playerIndex].playerRole === TypePlayerRole.Defender && placedCards.length !== 0) {
    console.log(checkCardRank(card))
    return checkCardRank(card);
  } else return false;
}

const checkCardRank = (playerCard: TypeCard): boolean => {
    const placedCards = gameStore.placedCards as Array<TypePlacedCard>;

    if (placedCards.length !== 0) {
      const placedCard = gameStore.placedCards[placedCards.length - 1].attacker as TypeCard;
      console.log(playerCard.rank, placedCard)
      if (
        (playerCard.rank > placedCard.rank && playerCard.suit === placedCard.suit)
        || (playerCard.isTrump && !placedCard.isTrump)
      ) return true;
    }
  return false;
}