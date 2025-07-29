

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from 'public' folder
app.use(express.static('public'));

// Store connected users: socket.id => username
const users = {};

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  // Save username sent from client
  socket.on('setUsername', (username) => {
    users[socket.id] = username;
    console.log(`👤 Username set for ${socket.id}: ${username}`);
  });

  // Receive and broadcast chat message
  socket.on('chat message', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    io.emit('chat message', {
      username,
      message: msg
    });
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
    delete users[socket.id];
  });
});

// Start server
http.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
