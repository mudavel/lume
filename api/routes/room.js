const router = require('express').Router()
const Room = require('../model/Room')
const User = require('../model/User')
const CURRENT_URL =
  process.env.CURRENT_URL || require('../../config').CURRENT_URL

router.post('/:name', async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', CURRENT_URL)
  try {
    if (req.originalUrl.includes('?'))
      return res.redirect(req.originalUrl.split('?').shift())

    const room = await Room.findOne({ fancy_name: req.params.name })

    if (!room) return res.redirect('/')
    res.json({
      _id: room._id,
      allowed_users: room.allowed_users,
      owner: room.owner,
      fancy_name: room.fancy_name,
      creation_date: room.creation_date,
    })
  } catch (err) {
    res.json({ error: err })
  }
})

router.patch('/:fancyName', async (req, res, next) => {
  try {
    if (!(await User.findOne({ username: req.body.username }))) return
    const updatedRoom = await Room.updateOne(
      { fancy_name: req.params.fancyName },
      { $addToSet: { allowed_users: req.body.username } }
    )
    res.json(updatedRoom)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
