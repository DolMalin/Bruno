const express = require('express')
const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.json())

let server
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('db ok')
	server = app.listen(process.env.APP_PORT, () => {
		console.log(`Listening to port ${process.env.APP_PORT}`)
	})
})

process.on('SIGTERM', () => {
	console.log('SIGTERM ok')
	if (server) {
		server.close()
	}
})