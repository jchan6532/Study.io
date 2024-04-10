import io from 'socket.io-client';

// Assuming your server is running on localhost:5000
const SOCKET_IO_URL = process.env.REACT_APP_BACKEND_URL;
const socket = io(SOCKET_IO_URL);

export default socket;
