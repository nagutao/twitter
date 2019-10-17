const tweet = require('../model/tweet');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

class TweetControl {
    async create(req, res){
        if (req.file){
            const image = req.file.filename;
            const [name, ext] = image.split('.');
            if (ext != 'png' && ext != "jpg" && ext!= "gif") return console.error('Tipo de arquivo invalido');
            if(!req.body.conteudo){
                req.body.conteudo = ' ';
                req.body.withText = false;
            }
        }
        const newTweet = await tweet.create({
            autor: req.body.autor,
            conteudo: req.body.conteudo,
            withText: req.body.withText
        })
        
        if (req.file){
            const image = req.file.filename;
            const [name] = image.split('.');
            const fileName = `${name}.jpg`;
        
            await sharp(req.file.path)
                .resize(500)
                .jpeg({ quality: 70})
                .toFile(
                    path.resolve(req.file.destination, 'resized', fileName)
                )
            fs.unlinkSync(req.file.path);
            newTweet.imagem = fileName;
        }
        return res.json(newTweet);
    }
    async show(req, res){
        return res.json(await tweet.find().sort({createdAt: -1}));
    }
    async showOne(req, res){
        const show = await tweet.findById(req.params.id).populate({
            path: 'comentarios',
            options:  { sort: {createdAt: -1} }
        });
        return res.json(show);
    }
    async delete(req, res){
        const Tweet = await tweet.findById(req.params.id);
        if (Tweet.comentarios){
            for (let id of Tweet.comentarios){
                await tweet.findByIdAndRemove(id);
            }
        }
        return await tweet.findByIdAndRemove(req.params.id);
    }
}

module.exports = new TweetControl;