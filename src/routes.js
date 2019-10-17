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
//view tweet especifico e comentarios do msm
routes.get('/tweet/:id', tweetControl.showOne);
// deletear tweet
routes.delete('/tweet/:id', tweetControl.delete);
//like
routes.post('/tweet/:id/like', likeControl.like);
//comentar
routes.post('/tweet/:id/comentario', comentarioControl.save);

module.exports = routes;