const tweet = require('../model/tweet');
// const comentario = require('../model/comentario');

class ComentarioControl {
    async save (req, res){
        const Tweet = await tweet.findById(req.params.id);
        const newComentario = await tweet.create({
            autor: req.body.autor,
            conteudo: req.body.conteudo
        })
        await Tweet.comentarios.push(newComentario);
        await Tweet.save();
        return res.json(newComentario);
    }
    
}

module.exports = new ComentarioControl;