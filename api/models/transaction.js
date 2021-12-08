const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	time :{
		type : Date, 
		default: Date.now,
	},
	currencyFrom:{
		type:String,
		required:true
	},
	currencyTo:{
		type:String,
		required:true
	},
	amount:{
		type:Number,
		required:true
	}
})

module.exports = mongoose.model('Transaction', transactionSchema) 