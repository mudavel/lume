import Message from '../model/Message'
const router = require('express').Router()

const DEFAULT_EXPIRATION = 3600

// redisClient.connect()
// redisClient.on('error', (err) => console.log('Redis Client Error', err))

router.post('/:room_id', async (req, res, next) => {
  try {
    // if (await redisClient.exists('previous')) {
    // console.log('Cache Hit')
    // const previous = await redisClient.get('previous')
    // return res.send(JSON.parse(previous))
    // } else {
    // console.log('Cache Miss')
    const messages = await Message.find({ room: req.params.room_id })
    // await redisClient.setEx(
    //   'previous',
    //   DEFAULT_EXPIRATION,
    //   JSON.stringify(messages)
    // )
    return res.send(messages)
    // }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
