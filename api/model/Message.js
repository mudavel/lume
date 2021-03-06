const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Messages', MessageSchema)
