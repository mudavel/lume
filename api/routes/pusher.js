import Pusher from 'pusher'
import express from 'express'
import Message from '../model/Message'
const router = express.Router()

const pusherSecrets = {
  app_id:
    process.env.PUSHER_ID || require('../../config').PUSHER_SECRETS.app_id,
  key: process.env.PUSHER_KEY || require('../../config').PUSHER_SECRETS.key,
  secret:
    process.env.PUSHER_SECRET || require('../../config').PUSHER_SECRETS.secret,
  cluster:
    process.env.PUSHER_CLUSTER ||
    require('../../config').PUSHER_SECRETS.cluster,
}

const pusher = new Pusher(pusherSecrets)

router.post('/previous-messages', async (req, res, next) => {
  const messages = await Message.find({ room: req.body.room_id })
  pusher.trigger(req.body.room_id, 'previous-messages', messages)
  res.status(200).send('Previous messages sent!')
})

router.post('/send', async (req, res, next) => {
  try {
    const message = await new Message({
      username: req.body.username,
      message: req.body.message,
      room: req.body.room,
      isOwner: req.body.isOwner,
    }).save()

    pusher.trigger(req.body.room_id, 'send', message)
    res.send(`"${req.body.message}" was sent.`)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
