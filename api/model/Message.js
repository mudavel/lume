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
  isOwner: {
    type: Boolean,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Messages', MessageSchema)
