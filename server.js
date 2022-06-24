const express = require('express')
const { config } = require('dotenv')
const { connect } = require('mongoose')

config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(require('cors')())
app.use('/system', require('./system/system.module'))
app.use('/auth', require('./auth/auth.module'));

(async () => {
  try {
      await connect(process.env.LINK, {
          useNewUrlParser: true
      })
  } catch (error) {
      console.log(error.message);
  }
})()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server run in port ${port}`)
})