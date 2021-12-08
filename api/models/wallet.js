const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	usdt:{
		type:Number,
	},
	btc:{
		type:Number,
	},
	eth:{
		type:Number,
	}
})

module.exports = mongoose.model('Wallet', walletSchema) 