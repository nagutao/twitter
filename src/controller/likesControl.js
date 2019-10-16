const Tweet = require('../model/tweet');

class LikeController {
    async like(req, res){
        const tweet = await Tweet.findById(req.params.id);
        tweet.likes++;
        await tweet.save();
        return res.json(tweet);
    }
}

module.exports = new LikeController;