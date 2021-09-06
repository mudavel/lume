const router = require('express').Router()
const User = require('../model/User')

router.get('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    res.send(!!user)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
