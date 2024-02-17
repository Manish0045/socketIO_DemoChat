const express = require('express');
const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);


app.use(cors());


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);


    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User Connected with ID: ${socket.id} join_room_id: ${data}`);
    })

    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    })
})



const PORT = 2299;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})