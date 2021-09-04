import Pusher from 'pusher'
import express from 'express'
import Message from '../model/Message'
const router = express.Router()

const pusher = new Pusher({
  app_id: '1259228',
  key: '389a8d7c96b12eded195',
  secret: 'f90f74fb36496ebe82ae',
  cluster: 'us2',
})

router.post('/previous-messages', async (req, res, next) => {
  const messages = await Message.find({ room: req.body.room_id })
  pusher.trigger(req.body.room_id, 'previous-messages', messages)
  res.status(200).send('Previous messages sent!')
})

router.post('/send', async (req, res, next) => {
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

module.exports = router
