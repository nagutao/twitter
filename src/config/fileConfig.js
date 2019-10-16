const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


module.exports= {
    storage: new multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.resolve(process.cwd(), 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                carro = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, carro);
            });
        }
    })
}