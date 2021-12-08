const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

const getTransaction = async (req, res, next) => {
    let transaction
    try {
        transaction = await Transaction.findById(req.params.id)
        if (transaction == null) {
            return res.status(404).json({message: 'Cannot find transaction'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.transaction = transaction
    next()
}

router.get('/', async (req,res) => {
    try {
        const transactions = await Transaction.find()
        res.send(transactions)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getTransaction, (req,res) => {
    res.json(res.transaction)
})

router.post('/', async (req,res) => {
    const transaction = new Transaction({
        userId: req.body.userId,
        currencyFrom: req.body.currencyFrom,
        currencyTo:req.body.currencyTo,
		amount:req.body.amount
    })

    try {
        const newTransaction = await transaction.save()
        res.status(201).json(newTransaction)
    } catch(err) {
        res.status(400).json().json({message: err.message})
    }
})

router.patch('/:id', getTransaction, async (req,res) => {
    if (req.body.userId != null) {
        res.transaction.userId = req.body.userId
    }
    if (req.body.currencyFrom != null) {
        res.transaction.currencyFrom = req.body.currencyFrom
    }
    if (req.body.currencyTo != null) {
        res.transaction.currencyTo = req.body.currencyTo
    }
    if (req.body.amount != null) {
        res.transaction.amount = req.body.amount
    }
    try {
        const updatedTransaction = await res.transaction.save()
        res.json(updatedTransaction)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getTransaction, async (req,res) => {
    try {
        await res.transaction.remove()
        res.json({message: 'Deleted Transaction'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router