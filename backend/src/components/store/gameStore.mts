import { TypeGameStore, TypeGameStatus, TypeCard, TypePlacedCard, TypePlayer, TypePlayerRole, TypePlayerStatus, TypeAction } from '../types/types.mjs';
import { proxy, subscribe } from 'valtio/vanilla';
import { proxyWithHistory } from 'valtio/utils';
import { endGame } from '../utils/utils.js';

const player1: TypePlayer = {
  socketId: '',
  playerName: '',
  playerAvatar: 'Avatar 1',
  playerRole: TypePlayerRole.Attacker,
  playerStatus: TypePlayerStatus.Offline,
  cards: [],
}

const player2: TypePlayer = {
  socketId: '',
  playerName: '',
  playerAvatar: 'Avatar 2',
  playerRole: TypePlayerRole.Defender,
  playerStatus: TypePlayerStatus.Offline,
  cards: [],
}

export const gameStoreWithHistory = proxyWithHistory<TypeGameStore>({
  id: '1',

  gameStatus: TypeGameStatus.WaitingForPlayers,

  hostId: 'host',

  deckCards: [],

  lastAttackerCard: null,

  placedCards: [],

  players: [
    player1,
    player2
  ],

  lastAction: TypeAction.Undefined,

  dealtCards: [],
});

export const gameStore = gameStoreWithHistory.value;


// localStorage.setItem('gamestore', JSON.stringify(gameStore))

subscribe(gameStore, () => {
  console.log('store changed')
});

// subscribe(gameStore.players, () => {
//   if (gameStore.players[0].cards.length === 0) {
//     endGame(0);
//   } else if (gameStore.players[1].cards.length === 0) {
//     endGame(1);
//   }
//   console.log('end game sub')
// })