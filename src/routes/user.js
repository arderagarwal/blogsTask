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

module.exports = router