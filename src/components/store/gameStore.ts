import { devtools } from 'valtio/utils';
import { proxy } from "valtio";
import {
  TypeCard,
  TypePlacedCard,
  TypeGameStatus,
  TypePlayerRole,
  TypePlayerStatus,
  TypePlayer,
  TypeGameStore,
} from "../../types/types";


const player1: TypePlayer = {
  socketId: '',
  playerName: 'Player 1',
  playerAvatar: 'Avatar 1',
  playerRole: TypePlayerRole.Attacker,
  playerStatus: TypePlayerStatus.Offline,
  cards: [],
}

const player2: TypePlayer = {
  socketId: '',
  playerName: 'Player 2',
  playerAvatar: 'Avatar 2',
  playerRole: TypePlayerRole.Defender,
  playerStatus: TypePlayerStatus.Offline,
  cards: [],
}

export const gameStore = proxy<any>({
  id: '1',

  gameStatus: "",

  hostId: '',

  deckCards: [],

  lastAttackerCard: null,

  placedCards: [],

  players: [player1, player2],

  lastAction: ""
})

export const unsub = devtools(gameStore, { name: 'Game Store', enabled: true});

export const updateStore = (store: any) => {
  for (let key in store) {
    if (store.hasOwnProperty(key)) {
      gameStore[key] = store[key];
    }
  }
}