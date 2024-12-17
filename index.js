const express = require("express");
const app = express();
const { createServer } = require('node:http');
const path = require("path");
const PORT = process.env.PORT || 3000;
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);
let userconnected = new Set();

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", onconnected);

function onconnected(socket) {
    console.log("A user connected", socket.id);
    userconnected.add(socket.id);
    io.emit("total_clinet",userconnected.size)
    // console.log(`Total number of clients connected are ${userconnected.size}`)
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      userconnected.delete(socket.id);
      // console.log(`Total number of clients connected are ${userconnected.size}`)
    });
    socket.on("chat_message",(message)=>{
      socket.broadcast.emit('chat_message', message);
    })
  
}




server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});