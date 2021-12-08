require('dotenv').config()

const express = require('express');
const axios = require('axios')
const app = express();

// MIDDLEWARES
app.use(express.json());

const userHaveFunds = async (userId, currencyFrom, amount) => {
	await axios.get("http://localhost:4141/wallet/")
}

const buy = async (userId, currencyFrom, currencyTo, amount) => {
	let currencyFromData = {}
	let currencyToData = {}

	await axios.get(`https://data.messari.io/api/v1/assets/${currencyFrom}/metrics`)
	.then(res => {
		let data = res.data.data
		currencyFromData.name = data.name
		currencyFromData.symbol = data.symbol
		currencyFromData.priceUsd = data.market_data.price_usd
	})
	.catch(err => {
		console.log(err)
	})
	await axios.get(`https://data.messari.io/api/v1/assets/${currencyTo}/metrics`)
	.then(res => {
		let data = res.data.data
		currencyToData.name = data.name
		currencyToData.symbol = data.symbol
		currencyToData.priceUsd = data.market_data.price_usd
	})
	.catch(err => {
		console.log(err)
	})

	console.log(currencyFromData)
	console.log(currencyToData)
}

buy("123", "btc", "usdt", 1)
app.listen(process.env.PORT, () => {
	console.log(`🚀 APP is running on PORT - ${process.env.APP_PORT}`)
})
