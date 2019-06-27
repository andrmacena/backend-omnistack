const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes = {
   local: new multer.diskStorage({
      //resolve: estou pegando o diretorio raiz com _dirname, voltando duas pastas e entrando na pasta uplodas pra salvar ro arquivo
      destination: path.resolve(__dirname, '..', '..', 'uploads'),
      filename: (req, file, callback) => {
         crypto.randomBytes(16, (err, hash) => {
            if (err) callback(err)

            const fileName = `${hash.toString('hex')}-${file.originalname}`
            callback(null, fileName)
         })
      }
   }),
   s3: multerS3({
      //lê minhas variaveis ambiente, para configuração de produção
      s3: new aws.S3(),
      bucket: 'backend-semanaomnistack',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
         crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err)

            const fileName = `${hash.toString('hex')}-${file.originalname}`
            cb(null, fileName)
         })
      }
   }),
}

module.exports = {
    storage: storageTypes["local"]
}