const { Server } = require('socket.io');

let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST']
    },
    // Increase max buffer size to handle file uploads (5MB + buffer for base64 overhead)
    maxHttpBufferSize: 8 * 1024 * 1024, // 8MB to accommodate base64 overhead
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Load shareEvents and userEvents
    require('../events/shareEvents')(io, socket);
    require('../events/userEvents')(io, socket);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

module.exports = { setupSocket, getIO };