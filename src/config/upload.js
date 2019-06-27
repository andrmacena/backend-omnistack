const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    storage: new multer.diskStorage({
        //resolve: estou pegando o diretorio raiz com _dirname, voltando duas pastas e entrando na pasta uplodas pra salvar ro arquivo
        destination: path.resolve(__dirname, '..','..', 'uploads'),
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err,hash) =>{
                if(err) callback(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                callback(null, fileName)
            })
        }
    })
}