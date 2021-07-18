import IO from 'socket.io-client';
import { WS } from './constants';

const option = {
  autoConnect: false,
  path: '/ws',
};

if (process.env.NODE_ENV === 'development') {
  option.autoConnect = true;
}

const io = IO(WS, option);
io.on('auth', (data) => {
  console.info('[socket] login', data);
});

export default io;
