import { gameStore } from "../store/gameStore";
import { socket } from "../../socket";
import { TypePlacedCard, TypePlayerRole, TypeCard, TypePlayer, TypeGameStatus, TypeGameStore } from "../../types/types";
import { snapshot } from "valtio/vanilla";
import { ethers } from 'ethers';



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

export const connectWallet = async (playerIndex: number) =>{
  console.log('check type')
  if (typeof window.ethereum !== 'undefined') {
    console.log('eth ok')
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()
    const signedMessage = await signer.signMessage("I am at least 18 years of age and I have read, accepted and agreed to the Privacy Policy and Terms and Conditions")
    signer.getAddress()
    .then(res => {
      console.log(res)
      gameStore.players[playerIndex].playerAvatar = res;
      console.log(gameStore.players[playerIndex].playerAvatar)
    })
    .catch(err => console.log(err))
  } else alert('Install Metamask extension!');
}