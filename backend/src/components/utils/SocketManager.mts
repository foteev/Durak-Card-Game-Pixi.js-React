import { Socket } from "socket.io-client";
import { gameStore, gameStoreWithHistory } from "../store/gameStore.mjs";
import { TypeGameStatus, TypePlayerRole, TypePlayerStatus } from "components/types/types.mjs";
// import { io } from "../../index.js";
import { giveCards, makePlayerMove, createDeck, undoGameStore } from "./utils.js";
import { subscribe } from "valtio";

export const SocketManager = (socket: any) => {

  const players = gameStore.players

  socket.on('connection', () => {
  })

  socket.on('player name & socket.id', (message: {name: string, socketId: string}) => {
    

    players[0].playerRole = TypePlayerRole.Attacker
    players[1].playerRole = TypePlayerRole.Defender
    gameStore.gameStatus === TypeGameStatus.DrawingCards;
    giveCards();
    players[0].playerRole = TypePlayerRole.Defender
    players[1].playerRole = TypePlayerRole.Attacker

    if (players[0].playerName.length === 0) {
      players[0].playerName = message.name;
      players[0].socketId = message.socketId;
      players[0].playerStatus = TypePlayerStatus.InGame

    } else if (players[1].playerName.length === 0) {
      players[1].playerName = message.name;
      players[1].socketId = message.socketId;
      gameStore.gameStatus = TypeGameStatus.GameInProgress;
      players[1].playerStatus = TypePlayerStatus.InGame

      socket.to(players[0].socketId).emit('player enter', JSON.stringify(gameStore));
    } else socket.emit('error', 'The room is full');

    socket.emit('player enter', JSON.stringify(gameStore));

  })

  socket.on('player move', (message: {playerIndex: number, card: string}) => {
    makePlayerMove(message.playerIndex, message.card);

    // players.forEach(player => {
    //   socket.to(player.socketId).emit('player move done', JSON.stringify(gameStore));
    // })
  })

  socket.on('undo', (message: { playerIndex: number }) => {
    undoGameStore(message.playerIndex);
  })

  subscribe(gameStore, () => {
    socket.to(players[0].socketId).emit('store update', JSON.stringify(gameStore));
    socket.to(players[1].socketId).emit('store update', JSON.stringify(gameStore));
    console.log('state sended')
  })
  
}