import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
let socket;
if (process.env.NODE_ENV === 'development') {
  console.log('Running in Dev mode');
  socket = socketIOClient(ENDPOINT);
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in Production');
  socket = socketIOClient();
}

export default socket;
