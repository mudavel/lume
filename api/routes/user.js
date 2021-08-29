const User = require('../model/User')
const router = require('express').Router()

router.get('/:username', async (req, res, next) => {
  try {
    const userQuery = await User.findOne({ username: req.params.username })
    if (userQuery) {
      const user = {
        _id: userQuery._id,
        username: userQuery.username,
        email: userQuery.email,
        creation_date: userQuery.creation_date,
      }
      return res.json(user)
    }
    res.send()
  } catch (err) {
    console.log(err)
    res.json({ message: err })
  }
})

module.exports = router
