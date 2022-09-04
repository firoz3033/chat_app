const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT  || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});






io.on('connection', (socket) => {
  socket.on('joined', (user)=>{
    socket.broadcast.emit('joined',user);

  })
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('message',msg);
  });
});







server.listen(port, () => {
  console.log('listening on '+port);
});
app.use(express.static(__dirname + '/public'))