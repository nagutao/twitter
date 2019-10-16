const tweet = require('../model/tweet');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

class TweetControl {
    async create(req, res){
        if (req.file){
            if(!req.body.conteudo){
                req.body.conteudo = ' ';
                req.body.withText = false;
            }
        }
        
        let image = req.file.filename;
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path);
        const newTweet = await tweet.create({
            autor: req.body.autor,
            conteudo: req.body.conteudo,
            imagem: fileName,
            withText: req.body.withText
        })

        return res.json(newTweet);
    }
    async show(req, res){
        return res.json(await tweet.find().sort({createdAt: -1}));
    }
}

module.exports = new TweetControl;