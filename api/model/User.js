const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Users', UserSchema)
