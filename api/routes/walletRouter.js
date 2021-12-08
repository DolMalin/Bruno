const express = require('express')
const router = express.Router()
const Wallet = require('../models/wallet')

const getWallet = async (req, res, next) => {
    let wallet
    try {
        wallet = await Wallet.findById(req.params.id)
        if (wallet == null) {
            return res.status(404).json({message: 'Cannot find wallet'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.wallet = wallet
    next()
}

router.get('/', async (req,res) => {
    try {
        const wallets = await Wallet.find()
        res.send(wallets)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getWallet, (req,res) => {
    res.json(res.wallet)
})

router.post('/', async (req,res) => {
    const wallet = new Wallet({
        userId: req.body.userId,
        usdt: req.body.usdt,
        btc:req.body.btc,
		eth:req.body.eth
    })

    try {
        const newWallet = await wallet.save()
        res.status(201).json(newWallet)
    } catch(err) {
        res.status(400).json().json({message: err.message})
    }
})

router.patch('/:id', getWallet, async (req,res) => {
    if (req.body.userId != null) {
        res.wallet.userId = req.body.userId
    }
    if (req.body.usdt != null) {
        res.wallet.usdt = req.body.usdt
    }
    if (req.body.btc != null) {
        res.wallet.btc = req.body.btc
    }
    if (req.body.eth != null) {
        res.wallet.eth = req.body.eth
    }
    try {
        const updatedWallet = await res.wallet.save()
        res.json(updatedMovie)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getWallet, async (req,res) => {
    try {
        await res.wallet.remove()
        res.json({message: 'Deleted Wallet'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router