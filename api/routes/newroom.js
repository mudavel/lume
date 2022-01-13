const express = require('express')
const Room = require('../model/Room')
const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    console.log(await Room.findOne({ fancy_name: req.body.name }))
    if (await Room.findOne({ fancy_name: req.body.name }))
      return res.json({ message: `${req.body.name} already exists` })
    const room = new Room({
      owner: req.body.owner,
      fancy_name: req.body.name,
      allowed_users: req.body.owner,
    })
    const savedRoom = await room.save()
    const _id = savedRoom._id.toString()
    res.json({ _id })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
