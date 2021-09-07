import express from 'express'
import mongoose from 'mongoose'

const app = express()
const { DB_CONNECTION, CURRENT_URL } = require('../config') || process.env

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CURRENT_URL)

  next()
})

app.use('/newroom', require('./routes/new-room'))
app.use('/auth', require('./routes/auth'))
app.use('/room', require('./routes/room'))
app.use('/userexists', require('./routes/userexists'))
app.use('/owner', require('./routes/owner'))
app.use('/pusher', require('./routes/pusher'))
app.use('/previous', require('./routes/previous'))

mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 9000,
  },
  (err) => {
    if (err) console.log(`Couldn't connect to Database.\n${err}`)
  }
)

export default { path: '/api', handler: app }
