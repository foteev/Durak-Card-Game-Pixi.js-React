import { Socket } from "socket.io-client";
import { gameStore, gameStoreWithHistory } from "../store/gameStore.mjs";
import { TypeGameStatus, TypePlayerRole, TypePlayerStatus } from "components/types/types.mjs";
import { giveCards, makePlayerMove, createDeck, undoGameStore, playerPass, clearHands, sortPlayerCards } from "./utils.js";
import { subscribe } from "valtio";

export const SocketManager = (socket: any) => {
  const players = gameStore.players

  socket.on('connection', () => {
  })

  socket.on('player name & socket.id', (message: {name: string, socketId: string}) => {
    if (players[0].playerName === message.name) {
      socket.to(players[0].socketId).emit('player enter', JSON.stringify(gameStore));
    } else if (players[1].playerName === message.name) {
      socket.to(players[1].socketId).emit('player enter', JSON.stringify(gameStore));
    } else
    if (players[0].playerName.length === 0) {
      players[0].playerRole = TypePlayerRole.Attacker
      players[1].playerRole = TypePlayerRole.Defender
      gameStore.gameStatus === TypeGameStatus.DrawingCards;

      giveCards();
      players[0].playerRole = TypePlayerRole.Defender
      players[1].playerRole = TypePlayerRole.Attacker


        players[0].playerName = message.name;
        players[0].socketId = message.socketId;
        players[0].playerStatus = TypePlayerStatus.InGame

    } else if (players[1].playerName.length === 0) {
      players[1].playerName = message.name;
      players[1].socketId = message.socketId;
      gameStore.gameStatus = TypeGameStatus.GameInProgress;
      players[1].playerStatus = TypePlayerStatus.InGame

      socket.to(players[0].socketId).emit('player enter', JSON.stringify(gameStore));
      socket.emit('player enter', JSON.stringify(gameStore));
    } else {
      socket.emit('error', 'The room is full');
    }
  })

  socket.on('player move', (message: {playerIndex: number, card: string}) => {
    makePlayerMove(message.playerIndex, message.card);
  })

  socket.on('undo', (message: { playerIndex: number }) => {
    undoGameStore(message.playerIndex);
  })

  socket.on('pass', (playerIndex: number) => {
    playerPass(playerIndex);
  })

  socket.on('reset', () => {
    clearHands();
  })

  socket.on('sort', (message: any) => {
    sortPlayerCards(message.playerIndex, message.type)
  })

  subscribe(gameStore, () => {
    socket.to(players[0].socketId).emit('store update', JSON.stringify(gameStore));
    socket.to(players[1].socketId).emit('store update', JSON.stringify(gameStore));
  })
}