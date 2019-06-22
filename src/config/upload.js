const multer = require('multer')
const path = require('path')

module.exports = {
    storage: new multer.diskStorage({
        //resolve: estou pegando o diretorio raiz com _dirname, voltando duas pastas e entrando na pasta uplodas pra salvar ro arquivo
        destination: path.resolve(__dirname, '..','..', 'uploads'),
        filename: function(req, file, callback){
            callback(null, file.originalname)
        }
    })
}