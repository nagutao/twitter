const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://nagutao:nagutao@cluster0-ebldr.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next)=>{
    req.io = io;
    next();
})

app.use(cors());

app.use('/tweet', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(express.json());

app.use(require('./routes'));

server.listen(4000);