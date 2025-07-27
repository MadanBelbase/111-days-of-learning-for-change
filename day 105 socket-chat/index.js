const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const users = {}; // socket.id -> username

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Set username
  socket.on('setUsername', (username) => {
    users[socket.id] = username;
    console.log(`Username set: ${username}`);
  });

  // Receive and broadcast message
  socket.on('chat message', (msg) => {
    const username = users[socket.id] || "Anonymous";
    io.emit('chat message', { username, message: msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete users[socket.id];
  });
});

http.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

