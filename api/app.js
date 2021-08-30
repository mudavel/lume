const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const passport = require('passport')
// const DB_CONNECTION = require('../config').DB_CONNECTION
// const User = require('./model/User')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(passport.initialize())
// app.use(passport.session())

// Routes
const messagesRoute = require('./routes/messages')
const newRoomRoute = require('./routes/new-room')
const authRoute = require('./routes/auth')
const roomRoute = require('./routes/room')
const getUserRoute = require('./routes/user')
const userRoomsRoute = require('./routes/owner')

// Route Middlewares
app.use('/messages', messagesRoute)
app.use('/newroom', newRoomRoute)
app.use('/auth', authRoute)
app.use('/room', roomRoute)
app.use('/user', getUserRoute)
app.use('/owner', userRoomsRoute)

// Connect to DB
mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.DB_CONNECTION
    : 'mongodb+srv://usuarioteste:testeusuario@primeirocluster.vcadi.mongodb.net/lume-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(`Couldn't connect to Database.\n${err}`)
    console.log('Connected to Database.')
  }
)

app.get('/', (req, res, next) => {
  res.send('api is working!')
})

// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser((id, done) => done(null, User.findById(id)))

// export default process.env.NODE_ENV === 'production'
//   ? app
//   : { path: '/api', handler: app }

export default { path: '/api', handler: app }
