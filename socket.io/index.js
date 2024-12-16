const http = require('http');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path =require ('path');
const { Server } = require("socket.io");
const { Socket } = require('dgram');

const app = express();
const server =http.createServer(app);
const io = new Server(server);


// socket.io 

io.on('connection', (socket) =>{
    socket.on('user-message',(message)=>{
        // console.log("a new User Message", message);
        io.emit('message',message);
    });
});

app.use(express.static(path.resolve('./public')));

app.get("/",(req,res)=>{
    return res.sendFile("public/index.html");
})

server.listen(9000,() => console.log("Server Started at PORT:9000"))