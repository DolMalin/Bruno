const express = require('express')
const router = express.Router()
const User = require('../models/user')

const getUser = async (req, res, next) => {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getUser, (req,res) => {
    res.json(res.user)
})

// router.post('/', async (req,res) => {
//     const user = new User({
//         username: req.body.username,
//     })

//     try {
// 		const newUser = await user.save( async (err, user) => {
// 			await `axios`.post("http://localhost:4141/wallet", {
// 				userId: user.id
// 			})
// 		})
// 	res.status(201).json(newUser)
//     } catch(err) {
//         res.status(400).json().json({message: err.message})
//     }
// })

router.patch('/:id', getUser, async (req,res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getUser, async (req,res) => {
    try {
        await res.user.remove()
        res.json({message: 'Deleted User'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router