import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import Message from './model/Message'

const app = express()
const DB_CONNECTION =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_CONNECTION
    : `mongodb+srv://Development123:${
        require('./config').MONGO_PASSWORD
      }@primeirocluster.vcadi.mongodb.net/lume-db`

const pusher = new Pusher({
  app_id: '1259228',
  key: '389a8d7c96b12eded195',
  secret: 'f90f74fb36496ebe82ae',
  cluster: 'us2',
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Route Middlewares
app.use('/messages', require('./routes/messages'))
app.use('/newroom', require('./routes/new-room'))
app.use('/auth', require('./routes/auth'))
app.use('/room', require('./routes/room'))
app.use('/user', require('./routes/user'))
app.use('/owner', require('./routes/owner'))

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

app.post('/previous-messages', async (req, res, next) => {
  const messages = await Message.find({ room: req.body.room_id })
  pusher.trigger(req.body.room_id, 'previous-messages', messages)
  res.status(200).send('Previous messages sent!')
})

app.post('/send', async (req, res, next) => {
  const message = new Message({
    username: req.body.username,
    message: req.body.message,
    room: req.body.room,
    isOwner: req.body.isOwner,
  })

  try {
    const savedMessage = await message.save()
    pusher.trigger(req.body.room_id, 'send-message', savedMessage)
    res.send('Message sent')
  } catch (err) {
    console.log(err)
  }
})

export default { path: '/api', handler: app }
