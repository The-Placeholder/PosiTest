import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
try {
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in Dev mode');
    const socket = socketIOClient(ENDPOINT);
  } else if (process.env.NODE_ENV === 'production') {
    console.log('Running in Production');
    const socket = socketIOClient();
  }
} catch (err) {}

export default socket;
