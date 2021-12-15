const express = require('express')
require('dotenv').config()

const app = express()

// ROUTES
const walletRouter = require('./routes/walletRouter')
app.use('/wallet', walletRouter)

const transactionsRouter = require('./routes/transactionsRouter')
app.use('/transaction', transactionsRouter)

const userRouter = require('./routes/userRouter')
app.use('/user', userRouter)

module.exports = app