const router = require('express').Router()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || require('../../config').ACCESS_TOKEN_SECRET

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

router.post('/:login_or_register', async (req, res, next) => {
  if (req.params.login_or_register === 'register') {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).save()
      return res.send(user)
    } catch (err) {
      return res.status(400).send(err)
    }
  } else if (req.params.login_or_register === 'login') {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        if (!(await bcrypt.compare(req.body.password, user.password))) {
          return res.json({ message: 'Invalid email or password' })
        }
        const jwtPayload = { _id: user._id, email: user.email }
        const accessToken = jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET)

        return res.json({ token: accessToken })
      } else {
        return res.json({ message: 'Invalid email or password' })
      }
    } catch (err) {
      console.log(`[DEBUG]\n${err}\n[DEBUG]`)
    }
  } else {
    return res.send('invalid request')
  }
})

module.exports = router
