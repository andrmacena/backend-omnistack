require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

//configurando servidor para o protocolo http e web socket
const server = require('http').Server(app)
const io = require('socket.io')(server)

//conexão com banco de dados
mongoose
    .connect('mongodb+srv://semana:rocketseat@cluster0-ocqjp.mongodb.net/test?retryWrites=true&w=majority',
        { useNewUrlParser: true })

//envio em tempo real
app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(cors())
//express.static(path.resolve(__dirname, '..', 'uploads', 'resized')
app.use('/files', 'https://backend-semanaomnistack.herokuapp.com')

app.use(require('./routes'))

server.listen(process.env.PORT || 3333)