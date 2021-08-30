const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const axios = require('axios')
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000' },
})

const BASE_URL = 'http://localhost:3000'

function sendMessage(socket) {
  socket.on('sendMessage', async (message, callback) => {
    if (message.message.trim().length && message.username.trim().length) {
      const toDatabase = await axios.post(`${BASE_URL}/api/messages/`, {
        data: message,
      })
      message.id = toDatabase.data._id
      socket.to(message.room).emit('broadcastMessage', message)
      callback(message)
    }
  })
}
function previousMessages(socket) {
  socket.on('previousMessages', async (roomId, callback) => {
    const getMessages = await axios.get(`${BASE_URL}/api/messages/${roomId}`)
    callback(getMessages.data)
  })
}
function joinRoom(socket) {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId)
  })
}

io.on('connection', (socket) => {
  try {
    sendMessage(socket)
    joinRoom(socket)
    previousMessages(socket)
  } catch (err) {
    console.log(err)
  }
})

// if (process.env.NODE_ENV === 'production') server.listen(3000)

export default { path: '/ws', handler: server }
