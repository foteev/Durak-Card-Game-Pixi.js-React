import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import offerRouter from './routers/offer-router.js';
import orderRouter from './routers/order-router.js';
import productRouter from './routers/product-router.js';
import productCategoryRouter from './routers/product-сategory-router.js';
import userRouter from './routers/user-router.js';
import authRouter from './routers/authentication-router.js';
import { proxy, subscribe, snapshot } from 'valtio/vanilla'
import { gameStore } from './components/store/gameStore.mjs';
import { Server } from 'socket.io';
import * as http from 'http';
import { createDeck } from './components/utils/utils.js';
import { SocketManager } from './components/utils/SocketManager.mjs';




const DB_LOGIN = 'palletenjoer';
const DB_PASSWORD = 87654321;
const PORT = process.env.PORT ?? 5300;

const DB_URL = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@cluster0.afhplie.mongodb.net/Palletport?retryWrites=true&w=majority`

const app = express();

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
  });

app.use(cors());
app.use(express.json());

app.use('/api', productCategoryRouter);
app.use('/api', productRouter);
app.use('/api', offerRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);

const startServer = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(DB_URL);
        httpServer.listen(PORT, () => console.log('Its work WOW! Port: ', PORT));
    } catch (error) {
        console.error(error);
    }
}

startServer();

const snap = snapshot(gameStore);
createDeck();

io.on('connection', SocketManager);
