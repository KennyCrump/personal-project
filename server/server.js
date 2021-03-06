require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const axios = require('axios')

const ac = require('./auth_countroller')
const sc = require('./schedule_controller')
const uc = require('./user_controller')

const app = express()

app.use(express.json())

const {
    SERVER_PORT,
    SESSION_SECRET,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    ENVIRONMENT
  } = process.env;

  app.use( express.static( `${__dirname}/../build` ) )

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))

  app.get('/auth/callback', ac.login)
  app.post('/auth/logout', ac.logout)
//   app.use((req, res, next) => {
//     if (ENVIRONMENT === 'dev') {
//       req.app.get('db').set_data().then(userData => {
//         req.session.user = userData[0]
//         next();
//       })
//     } else {
//       next();
//     }
//   })

app.post('/api/time/add', sc.addTimeSlot)
app.get('/api/time/day', sc.getDay)

app.post('/api/appt/add', sc.addAppt)
app.put('/api/appt/:appt_id', sc.updateAppt)
app.delete('/api/appt/:appt_id', sc.deleteAppt)
app.get('/api/appt/day', sc.getApptsForDay) //Pulls date from query

app.get('/api/users', uc.getAllUsers)
app.get('/api/user/data', uc.getUserData) //Sets redux to what user is in session
app.get('/api/user/:id', uc.getUserProfile)
app.get('/api/users/day', uc.getUsersForDay) //Pulls date from query


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port ${SERVER_PORT}`)
      })
})