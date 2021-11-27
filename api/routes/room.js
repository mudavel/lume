const router = require('express').Router()
const Room = require('../model/Room')
const User = require('../model/User')

router.post('/:name', async (req, res, next) => {
  try {
    if (req.originalUrl.includes('?'))
      return res.redirect(req.originalUrl.split('?').shift())

    const room = await Room.findOne({ fancy_name: req.params.name })

    if (!room) return
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

router.patch('/:addOrRemove/:fancyName', async (req, res, next) => {
  try {
    if (req.params.addOrRemove === 'add') {
      if (!(await User.findOne({ username: req.body.username }))) return
      const updatedRoom = await Room.updateOne(
        { fancy_name: req.params.fancyName },
        { $addToSet: { allowed_users: req.body.username } }
      )
      res.json(updatedRoom)
    } else if (req.params.addOrRemove === 'remove') {
      const deletedUser = await Room.updateOne(
        { fancy_name: req.params.fancyName },
        { $pull: { allowed_users: req.body.username } }
      )
      res.json(deletedUser)
    }
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
