import express from 'express'
import Pusher from 'pusher'
import mongoose from 'mongoose'
import Message from './model/Message'

const app = express()
const DB_CONNECTION =
  process.env.DB_CONNECTION || require('../config').DB_CONNECTION

const pusherSecrets = {
  app_id: process.env.PUSHER_ID || require('../config').PUSHER_SECRETS.app_id,
  key: process.env.PUSHER_KEY || require('../config').PUSHER_SECRETS.key,
  secret:
    process.env.PUSHER_SECRET || require('../config').PUSHER_SECRETS.secret,
  cluster:
    process.env.PUSHER_CLUSTER || require('../config').PUSHER_SECRETS.cluster,
}
const pusher = new Pusher(pusherSecrets)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/newroom', require('./routes/new-room'))
app.use('/auth', require('./routes/auth'))
app.use('/room', require('./routes/room'))
app.use('/exists', require('./routes/exists'))
app.use('/owner', require('./routes/owner'))
app.use('/previous', require('./routes/previous'))

app.post('/send', async (req, res, next) => {
  try {
    const message = await new Message({
      sender: req.body.sender,
      content: req.body.content,
      room: req.body.room,
      isOwner: req.body.isOwner,
    }).save()

    pusher.trigger(req.body.room_id, 'send', {
      _id: message._id,
      sender: message.sender,
      content: message.content,
      isOwner: message.isOwner,
    })
    res.send(message)
  } catch (err) {
    console.log(err)
  }
})

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
