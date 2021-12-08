const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	usdt:{
		type:Number,
		default:500
	},
	btc:{
		type:Number,
		default:0
	},
	eth:{
		type:Number,
		default:0
	}
})

module.exports = mongoose.model('Wallet', walletSchema) 