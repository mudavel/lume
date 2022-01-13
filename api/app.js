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

app.use('/newroom', require('./routes/newroom'))
app.use('/auth', require('./routes/auth'))
app.use('/room', require('./routes/room'))
app.use('/exists', require('./routes/exists'))
app.use('/owner', require('./routes/owner'))
app.use('/previous', require('./routes/previous'))

app.post('/:sendOrDelete', async (req, res, next) => {
  try {
    if (req.params.sendOrDelete === 'send') {
      const message = await new Message({
        sender: req.body.sender,
        content: req.body.content,
        room: req.body.room,
      }).save()

      await pusher.trigger(req.body.room, 'send', message)

      res.send(message)
    } else if (req.params.sendOrDelete === 'delete') {
      await pusher.trigger(req.body.room, 'delete', req.body)
      const deletedMessage = await Message.deleteOne(req.body)
      res.send(deletedMessage)
    }
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
