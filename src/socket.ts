import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5300';
// const URL = "http://localhost:5300";
const URL = "https://durak2server-production.up.railway.app:6766"

export const socket = io(URL);