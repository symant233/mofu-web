import IO from 'socket.io-client';
import { WS } from './constants';

const io = IO(WS);
io.on('auth', (data) => {
  console.info('[socket] login', data);
});

export default io;
