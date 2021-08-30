const express = require('express')
const router = express.Router()
const Message = require('../model/Message')

router.get('/:chatId', async (req, res, next) => {
  try {
    const messages = await Message.find({ room: req.params.chatId })
    res.json(messages)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', async (req, res, next) => {
  const message = new Message({
    username: req.body.data.username,
    message: req.body.data.message,
    room: req.body.data.room,
    isOwner: req.body.data.isOwner,
  })
  try {
    const savedMessage = await message.save()
    res.json(savedMessage)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/:messageId', async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId)
    res.json(message)
  } catch (err) {
    res.json({ message: err })
  }
})

router.delete('/:messageId', async (req, res, next) => {
  try {
    const deletedMessage = await Message.remove({ _id: req.params.messageId })
    res.json(deletedMessage)
  } catch (err) {
    res.json({ message: err })
  }
})

router.patch('/:messageId', async (req, res, next) => {
  try {
    const messageChanges = { message: req.body.data.message }
    const updatedMessage = await Message.updateOne(
      { _id: req.params.messageId },
      { $set: messageChanges }
    )
    res.json(updatedMessage)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
