const mongoose = require('mongoose')
const { Schema } = mongoose

const RoomSchema = Schema({
  creation_date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: String,
    required: true,
  },
  fancy_name: {
    type: String,
    required: true,
    unique: true,
  },
  allowed_users: {
    type: [String],
    required: true,
  },
})

module.exports = mongoose.model('Rooms', RoomSchema)
