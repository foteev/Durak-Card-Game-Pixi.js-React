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
import { CardComponent } from "../GameStage/GameStage";
// import { MaskedFrame } from "@pixi/ui";
import { devtools } from 'valtio/utils';
import { io } from 'socket.io-client';
import { SERVER_ADDRESS, MAX_CARDS_IN_HAND } from '../../constants'

const socket = io(SERVER_ADDRESS);
socket.connect();

const player1: TypePlayer = {
  socketId: '1',
  playerName: 'Player 1',
  playerAvatar: 'Avatar 1',
  playerRole: TypePlayerRole.Attacker,
  playerStatus: TypePlayerStatus.Offline,
  cards: [],
}

const player2: TypePlayer = {
  socketId: '2',
  playerName: 'Player 2',
  playerAvatar: 'Avatar 2',
  playerRole: TypePlayerRole.Defender,
  playerStatus: TypePlayerStatus.Offline,
  cards: [],
}

export const str = proxy<any>({
  id: '1',

  gameStatus: "",

  hostId: 'host',

  deckCards: [],

  lastAttackerCard: null,

  placedCards: [],

  players: [player1, player2],

  lastAction: ""
})

const unsub = devtools(str, { name: 'Game Store', enabled: true})

export const sendMessage = (playerName: string) => {
  socket.on('message', (message) => {
    // console.log(message);
  })

  socket.emit('message', playerName);

  socket.on('store update', (store) => {
    const st = JSON.parse(store);
    for (let key in st) {
      if (st.hasOwnProperty(key)) {
          str[key] = st[key];
          console.log(str)
      }
    }
  })

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});
}


// export const startGame = (playerIndex: number) => {
//   gameStore.gameStatus = TypeGameStatus.DrawingCards;
//   giveCards(playerIndex);
// }