module.exports = (io, socket) => {
  
  socket.on('typing', (isTyping) => {
    if (socket.wifiRoom) {
      socket.to(socket.wifiRoom).emit('user-typing', {
        socketId: socket.id,
        isTyping
      });
    }
  });

  socket.on('disconnect', () => {
    if (socket.wifiRoom) {
      socket.to(socket.wifiRoom).emit('user-left', socket.id);
    }
  });
};