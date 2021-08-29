const express = require('express')
const Room = require('../model/Room')
const router = express.Router()

router.get('/:username', async (req, res, next) => {
  const userRooms = await Room.find({ owner: req.params.username })
  res.send(userRooms)
})

module.exports = router
