const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   author: String,
   place: String,
   description: String,
   hashtag: String,
   image: String,
   likes: {
      type: Number,
      default: 0
   },
   url: String, //AWS
   key: String //pegar o HASH da imagem
},
   { timestamps: true })

PostSchema.pre('save', function () {
   if (!this.url) {
      this.url = `${process.env.APP_URL}/files/${this.key}`
   }
})

module.exports = mongoose.model('Post', PostSchema)
