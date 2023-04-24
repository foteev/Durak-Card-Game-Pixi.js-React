import { TypeGameStore, TypeGameStatus, TypeCard, TypePlacedCard, TypePlayer, TypePlayerRole, TypePlayerStatus, TypeAction } from '../types/types.mjs';
import { proxy, subscribe } from 'valtio/vanilla';
import { proxyWithHistory } from 'valtio/utils';

const player1: TypePlayer = {
  socketId: '',
  playerName: '',
  playerAvatar: 'Avatar 1',
  playerRole: TypePlayerRole.Attacker,
  playerStatus: TypePlayerStatus.InGame,
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

  lastAction: TypeAction.Undefined
});

export const gameStore = gameStoreWithHistory.value;

// localStorage.setItem('gamestore', JSON.stringify(gameStore))

// subscribe(gameStore, () => {
//   localStorage.setItem('gamestore', JSON.stringify(gameStore))
// });