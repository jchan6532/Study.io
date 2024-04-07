import io from 'socket.io-client';

// Assuming your server is running on localhost:5000
const SOCKET_IO_URL = "http://localhost:5000";
const socket = io(SOCKET_IO_URL);

export default socket;
