require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MIDDLEWARES
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// ROUTES
const walletRouter = require('./routes/walletRouter')
app.use('/wallet', walletRouter)

const transactionsRouter = require('./routes/transactionsRouter')
app.use('/transaction', transactionsRouter)

app.listen(process.env.PORT, () => {
	console.log(`🚀 API is running on PORT - ${process.env.API_PORT}`)
})
