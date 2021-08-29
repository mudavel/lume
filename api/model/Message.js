const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
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
})

module.exports = mongoose.model('Messages', MessageSchema)
