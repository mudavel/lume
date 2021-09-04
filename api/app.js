import express from 'express'
import mongoose from 'mongoose'

const app = express()
const DB_CONNECTION =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_CONNECTION
    : `mongodb+srv://Development123:${
        require('../config').MONGO_PASSWORD
      }@primeirocluster.vcadi.mongodb.net/lume-db`

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Route Middlewares
app.use('/messages', require('./routes/messages'))
app.use('/newroom', require('./routes/new-room'))
app.use('/auth', require('./routes/auth'))
app.use('/room', require('./routes/room'))
app.use('/user', require('./routes/user'))
app.use('/owner', require('./routes/owner'))
app.use('/pusher', require('./routes/pusher'))

// Connect to DB
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
  },
  (err) => {
    if (err) return console.log(`Couldn't connect to Database.\n${err}`)
    console.log('Connected to Database.')
  }
)

export default { path: '/api', handler: app }
