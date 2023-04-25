import { Socket } from "socket.io-client";
import { gameStore } from "../store/gameStore.mjs";
import { TypeGameStatus, TypePlayerStatus } from "components/types/types.mjs";
// import { io } from "../../index.js";
import { giveCards } from "./utils.js";

export const SocketManager = (socket: any) => {
  socket.on('connection', () => {
  })

  socket.on('player name & socket.id', (message: {name: string, socketId: string}) => {
    const players = gameStore.players
    if (players[0].playerName.length === 0) {
      players[0].playerName = message.name;
      players[0].socketId = message.socketId;
      players[0].playerStatus = TypePlayerStatus.InGame
    } else if (players[1].playerName.length === 0) {
      players[1].playerName = message.name;
      players[1].socketId = message.socketId;
      gameStore.gameStatus = TypeGameStatus.DrawingCards;
      giveCards(0);
      console.log(gameStore.players[0].cards)
      players[1].playerStatus = TypePlayerStatus.InGame

      socket.to(players[0].socketId).emit('store update', JSON.stringify(gameStore));


    } else socket.emit('error', 'The room is full');
    console.log(message);

    socket.emit('store update', JSON.stringify(gameStore));
    console.log(gameStore.players[0].cards);
    // io.emit('store update', JSON.stringify(gameStore))
  })
}