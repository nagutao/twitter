//ARQUIVO INUTILs

const mongoose = require('mongoose');

const comentario = new mongoose.Schema({
    autor:{
        type: String,
        required: true
    }, 
    conteudo: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('comentario', comentario);