const express = require('express');
const http = require('http'); // Required to create an HTTP server
const { Server } = require('socket.io'); // Import Server from socket.io
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); 

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Adjust according to your requirements
    methods: ['GET', 'POST']
  }
});

const users = {};

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new-user-joined', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    console.log(socket.id);
    
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
