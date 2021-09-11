const router = require('express').Router()
const User = require('../model/User')

router.post('/:what/:query', async (req, res, next) => {
  try {
    if (!['email', 'username'].includes(req.params.what))
      return res.send('invalid request')

    const exists = await User.exists({
      [req.params.what]: req.params.query,
    })
    res.send(exists)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
