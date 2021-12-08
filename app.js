require('dotenv').config()

const express = require('express');
const app = express();

// MIDDLEWARES
app.use(express.json());

app.listen(process.env.PORT, () => {
	console.log(`🚀 APP is running on PORT - ${process.env.APP_PORT}`)
})
