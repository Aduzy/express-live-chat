const express = require('express');
const http = require('http');
const {port} = require('./config.json');

const app = express();
app.use('/', express.static('static'));

const server = http.createServer(app);
const io = require('socket.io')(server);

let usersSockets = [];

io.on('connection', (ws) => {
    ws.on('newUser', (data) => {
        usersSockets.push({
            socketID: ws.id,
            nickname: data.nickname
        });

        io.sockets.emit('newUser.return', (data));
    });

    ws.on('disconnect', (data) => {
        for(let i = 0; i < usersSockets.length; i++){ 
            if (usersSockets[i].socketID == ws.id) { 
                io.sockets.emit('disconnect.return', (usersSockets[i]));
                usersSockets.splice(i, 1);
            }
        };
    });

    ws.on('message', (data) => {
        io.sockets.emit('message.return', (data));
    });
});

server.listen(port, function(){
    console.log("Server listening on port " + port);
});