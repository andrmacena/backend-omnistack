const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')//file system

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')

        return res.json(posts)
    },

    async store(req, res) {
        const { author, place, description, hashtag } = req.body
        const { filename: image } = req.file

        const [name] = image.split('.')
        const [hash] = image.split('-', 2)
        const fileName = `${name}.jpg`

        //redimensionando imagem postada
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, 'resized', fileName))

        //excluindo imagem original
        fs.unlinkSync(req.file.path)

        const post = await Post.create({
            author,
            place,
            description,
            hashtag,
            image: fileName,
            url: '',
            key: hash
        })

        req.io.emit('post', post)

        return res.json(post)

    }
}