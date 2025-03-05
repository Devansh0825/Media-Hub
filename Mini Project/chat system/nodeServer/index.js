const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Serve static files
app.use(express.static('public'));

// Socket.io configuration
const users = {};

io.on('connection', (socket) => {
  console.log('New connection established');

  socket.on('new-user-joined', (name) => {
    if (!users[socket.id]) {
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    }
  });

  socket.on('send', (message) => {
    if (users[socket.id]) {
      socket.broadcast.emit('receive', { message, name: users[socket.id] });
    }
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    }
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
