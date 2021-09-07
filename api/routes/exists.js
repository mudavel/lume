const router = require('express').Router()
const User = require('../model/User')

router.post('/:what_exists/:query', async (req, res, next) => {
  try {
    if (!['email', 'username'].includes(req.params.what_exists))
      return res.send('invalid request')

    const exists = await User.exists({
      [req.params.what_exists]: req.params.query,
    })
    res.send(exists)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
