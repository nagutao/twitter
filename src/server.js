const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://nagutao:nagutao@cluster0-ebldr.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
// app.use(express.urlencoded());

app.use(require('./routes'));

app.listen(4000);