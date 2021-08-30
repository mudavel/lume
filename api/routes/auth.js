const router = require('express').Router()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')
const ACCESS_TOKEN_SECRET =
  process.env.NODE_ENV === 'production'
    ? process.env.ACCESS_TOKEN_SECRET
    : 'b475cc8573555862655c5eb196ddae4a350c860a9d8bcf0f45d6ed3890889f02e5c1bd290b2f48b0ac1c4554200b576443f1ddf61fb3e9bcc0c07c8e58c9bc29'

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ACCESS_TOKEN_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const userQuery = await User.findById(jwtPayload._id)
        const user = {
          _id: userQuery._id,
          username: userQuery.username,
          email: userQuery.email,
          creation_date: userQuery.creation_date,
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({ user: req.user })
  }
)

router.post('/register', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res, next) => {
  console.log('[debug] before try find user')
  try {
    console.log('[debug] find user 1')
    const user = await User.findOne({ email: req.body.email })
    console.log('[debug] find user 2')
    if (user) {
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.json({ message: 'Invalid email or password' })
      }
      const jwtPayload = { _id: user._id, email: user.email }
      const accessToken = jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET)

      res.json({ token: accessToken })
    } else {
      res.json({ message: 'User not found' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/logout', (req, res, next) => {
  res.json({ message: 'logged out' })
})

module.exports = router
