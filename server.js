const WebSocket = require('ws');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log('Server berjalan di http://localhost:3000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({
        type: 'Selamat Datang',
        message: "Sudah Terhubung!"
    }));

const interval = setInterval(() => {
    ws.send(JSON.stringify({
        type: 'message',
        content: "Ada Pesan Baru!",
        time: new Date().toLocaleTimeString()
    }));
}, 15000);

ws.on('close',() => clearInterval(interval));
});