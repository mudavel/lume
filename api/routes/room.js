const router = require('express').Router()
const Room = require('../model/Room')
const User = require('../model/User')

router.post('/:_id', async (req, res, next) => {
  try {
    if (req.originalUrl.includes('?'))
      return res.redirect(req.originalUrl.split('?').shift())

    const room = await Room.findOne({ _id: req.params._id })

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

router.patch('/:addOrRemove/:_id', async (req, res, next) => {
  try {
    if (req.params.addOrRemove === 'add') {
      if (!(await User.findOne({ username: req.body.username }))) return
      const updatedRoom = await Room.updateOne(
        { _id: req.params._id },
        { $addToSet: { allowed_users: req.body.username } }
      )
      res.json(updatedRoom)
    } else if (req.params.addOrRemove === 'remove') {
      const deletedUser = await Room.updateOne(
        { _id: req.params._id },
        { $pull: { allowed_users: req.body.username } }
      )
      res.json(deletedUser)
    }
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
