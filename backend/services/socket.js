// socket.js
const EventEmitter = require('events');
class SocketIOReadyEmitter extends EventEmitter {}
const socketIOReadyEmitter = new SocketIOReadyEmitter();

let io;

module.exports = {
  init: (httpServer) => {
    const {Server} = require('socket.io');
    io = new Server(httpServer, { cors: {origin:"*", methods: ["GET", "POST"]}});
    socketIOReadyEmitter.emit('ready', io);
    return io;
  },
  getIO: () => {
    if (!io) {
      return new Promise((resolve, reject) => {
        socketIOReadyEmitter.once('ready', (io) => {
          resolve(io);
        });
        setTimeout(() => {
          reject(new Error('Socket.io not initialized within timeout!'));
        }, 100000);
      });
    }
    return Promise.resolve(io);
  }
};
