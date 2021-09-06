import Message from '../model/Message'
const router = require('express').Router()

router.get('/:room_id', async (req, res, next) => {
  try {
    const messages = await Message.find({ room: req.params.room_id })
    res.send(messages)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
