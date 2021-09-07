const express = require('express')
const router = express.Router()
const Message = require('../model/Message')

// router.delete('/:messageId', async (req, res, next) => {
//   try {
//     const deletedMessage = await Message.remove({ _id: req.params.messageId })
//     res.json(deletedMessage)
//   } catch (err) {
//     res.json({ message: err })
//   }
// })

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
