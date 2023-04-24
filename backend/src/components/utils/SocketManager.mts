import { Socket } from "socket.io-client";
import { gameStore } from "../store/gameStore.mjs";
import { TypePlayerStatus } from "components/types/types.mjs";
// import { io } from "../../index.js";

export const SocketManager = (socket: any) => {
  socket.on('connection', () => {
  })
  socket.on('player name & socket.id', (message: {name: string, socketId: string}) => {
    const players = gameStore.players
    if (players[0].playerName.length === 0) {
      players[0].playerName = message.name;
      players[0].socketId = message.socketId;
      players[0].playerStatus = TypePlayerStatus.InGame
    } else {
      players[1].playerName = message.name;
      players[1].socketId = message.socketId;
      socket.to(players[0].socketId).emit('store update', JSON.stringify(gameStore));
      players[1].playerStatus = TypePlayerStatus.InGame
    }
    console.log(message);
    socket.emit('store update', JSON.stringify(gameStore));
    console.log(`store sent to ${message.name}`);
    // io.emit('store update', JSON.stringify(gameStore))
  })
}