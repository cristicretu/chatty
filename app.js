import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { new_user } from './sockets/chat.js'
import http from 'http' 

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// view engine for handlebars

//! Don't use a db for this project
//! save everything in memory, a restart will clear everything

let onlineUsers = {}
io.on('connection', (socket) => {
  new_user(io, socket, onlineUsers)
})
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.handlebars')
})

server.listen('8000', () => {
  console.log("Server listening on Port 8000")
})
