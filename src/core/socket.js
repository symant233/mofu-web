import IO from 'socket.io-client';
import { WS } from './constants';

const url = `${WS}/messages`;

const msg = IO(url);
msg.on('auth', (data) => {
  console.info('[ws] login', data);
});

export default msg;
