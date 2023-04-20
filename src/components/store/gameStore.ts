import { TypeGameStore, TypeGameStatus, TypeCard, TypePlacedCard, TypePlayer, TypePlayerRole, TypePlayerStatus, TypeAction } from '../../types/types';
import { proxy, subscribe } from 'valtio';
import { Deck } from '../../components/Deck/Deck';

const deck = new Deck();

// let deck: Deck = [];
// const deckPromise = async () => await new Deck();

// deckPromise()
//   .then(res => {
//     gameStore.deckCards = res.cards;
//   })


const player1: TypePlayer = {
  socketId: '1',
  playerName: 'Player 1',
  playerAvatar: 'Avatar 1',
  playerRole: TypePlayerRole.Attacker,
  playerStatus: TypePlayerStatus.InGame,
  cards: [],
}

const player2: TypePlayer = {
  socketId: '2',
  playerName: 'Player 2',
  playerAvatar: 'Avatar 2',
  playerRole: TypePlayerRole.Defender,
  playerStatus: TypePlayerStatus.InGame,
  cards: [],
}


export const gameStore = proxy<TypeGameStore>({
  id: '1',

  gameStatus: TypeGameStatus.WaitingForStart,

  hostId: 'host',

  deckCards: deck.cards,

  lastAttackerCard: null,

  placedCards: [],

  players: [
    player1,
    player2
  ],

  lastAction: TypeAction.Undefined
});

// localStorage.setItem('gamestore', JSON.stringify(gameStore))

// subscribe(gameStore, () => {
//   localStorage.setItem('gamestore', JSON.stringify(gameStore))
// });