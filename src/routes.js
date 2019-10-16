const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer(require('./config/fileConfig'));

const tweetControl = require('./controller/tweetControl');
const likeControl = require('./controller/likesControl');
const comentarioControl = require('./controller/comentarioControl');

//criar tweet
routes.get('/tweet', tweetControl.show);
// visualizar tweets
routes.post('/tweet', upload.single('imagem'), tweetControl.create);
//like
routes.post('/tweet/:id/like', likeControl.like);
//comentario
routes.post('tweet/:id/comentario', comentarioControl.save);

module.exports = routes;