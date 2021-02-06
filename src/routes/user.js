const express = require('express')
const User = require('../db/models/users')

const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.userName,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(err){
        res.status(403).send({error : "Invalid Credentials"})
    }
})

module.exports = router