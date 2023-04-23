import { Socket } from "socket.io-client";
import { gameStore } from "../store/gameStore.mjs";
// import { io } from "../../index.js";

export const SocketManager = (socket: any) => {
  socket.on('connection', () => {
  })
  socket.on('message', (message: string) => {
    console.log(message);
    socket.emit('store update', JSON.stringify(gameStore));
    console.log('store sent to ...')
    // io.emit('store update', JSON.stringify(gameStore))
  })
}