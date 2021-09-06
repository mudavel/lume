import express from 'express'
import mongoose from 'mongoose'

const app = express()
const DB_CONNECTION =
  process.env.DB_CONNECTION || require('../config').DB_CONNECTION

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Route Middlewares
app.use('/newroom', require('./routes/new-room'))
app.use('/auth', require('./routes/auth'))
app.use('/room', require('./routes/room'))
app.use('/userexists', require('./routes/userexists'))
app.use('/owner', require('./routes/owner'))
app.use('/pusher', require('./routes/pusher'))
app.use('/previous', require('./routes/previous'))

// Connect to DB
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
