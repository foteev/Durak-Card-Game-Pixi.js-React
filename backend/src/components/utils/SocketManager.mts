import { Socket } from "socket.io";
import { gameStore, gameStoreWithHistory } from "../store/gameStore.mjs";
import { TypeGameStatus, TypePlayerRole, TypePlayerStatus, TypeAction } from "components/types/types.mjs";
import { giveCards, makePlayerMove, createDeck, undoGameStore, playerPass, clearHands, sortPlayerCards, endGame } from "./utils.js";
import { subscribe } from "valtio";

export const SocketManager = (socket: any) => {
  const players = gameStore.players

  socket.on('connection', () => {
  })

  socket.on('player name & socket.id', (message: {name: string, socketId: string}) => {
    if (players[0].playerStatus === TypePlayerStatus.Offline) {
      console.log('player 0 enter')
      players[0].playerName = message.name;
      players[0].socketId = message.socketId;
      players[0].playerStatus = TypePlayerStatus.InGame
      players[0].playerRole = TypePlayerRole.Attacker
      players[1].playerRole = TypePlayerRole.Defender
      gameStore.gameStatus = TypeGameStatus.DrawingCards;
      gameStore.hostId = message.name;
      giveCards();
      players[0].playerRole = TypePlayerRole.Defender
      players[1].playerRole = TypePlayerRole.Attacker
      players[0].playerStatus = TypePlayerStatus.InGame
      socket.emit('player 0 enter', JSON.stringify(gameStore));
    }
    else if (players[1].playerStatus === TypePlayerStatus.Offline && players[0].playerStatus === TypePlayerStatus.InGame) {
      console.log('player 1 enter')
      players[1].playerName = message.name;
      players[1].socketId = message.socketId;
      players[1].playerStatus = TypePlayerStatus.InGame
      socket.emit('player 1 enter', JSON.stringify(gameStore));
    }
    else if (players[0].playerName === message.name) {
      players[0].socketId = message.socketId;
      console.log('return 0')
    }
    else if (players[1].playerName === message.name) {
      players[1].socketId = message.socketId;
      console.log('return 1')
    }
    else {
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

  socket.on('end game', (playerIndex: number) => {
    endGame(playerIndex);
    socket.emit('end game loser');
    socket.to(playerIndex === 0 ? players[1].socketId: players[0].socketId).emit('end game winner');
    clearHands();
  })

  subscribe(gameStore, () => {
    console.log('store emitted', gameStore.gameStatus, gameStore.players[0].playerName, gameStore.players[0].playerStatus, gameStore.players[0].playerName, gameStore.players[1].playerStatus)
    socket.to(players[0].socketId).emit('store update', JSON.stringify(gameStore));
    socket.to(players[1].socketId).emit('store update', JSON.stringify(gameStore));
  })

  subscribe(gameStore.players, () => {
    if (gameStore.gameStatus === TypeGameStatus.GameInProgress 
      && gameStore.lastAction !== TypeAction.Undefined
      && gameStore.deckCards.length === 0) {
      gameStore.players.forEach((player, playerIndex) => {
        if (player.cards.length === 0) {
          const otherPlayerIndex = playerIndex === 0 ? 1: 0
          endGame(playerIndex);
          socket.to(players[playerIndex].socketId).emit('end game winner');
          socket.to(players[otherPlayerIndex].socketId).emit('end game loser');
        }
      })
    }
  })
}