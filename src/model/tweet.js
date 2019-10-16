const mongoose = require('mongoose');

const tweet = new mongoose.Schema({
    withText: {
        type: Boolean,
        default: true
    },
    autor: {
        type: String,
        required: true
    },
    imagem: {
        type: String
    },
    conteudo: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweet' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('tweet', tweet);