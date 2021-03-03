const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')

const app = express()

app.use(express.json())
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

  next()
})

app.use(userRouter)

module.exports = app
