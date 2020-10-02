const express = require('express')
const userRouter = require('./routers/user')
const noteRouter = require('./routers/note')
require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(noteRouter)

module.exports = app