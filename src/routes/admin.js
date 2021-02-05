const express = require('express')
const Admin = require('../db/models/admin')

const router = new express.Router()

router.post('/admin/login', async(req,res)=>{
    try{
        const admin = await Admin.findByCredentials(req.body.adminName,req.body.password)
        const token = await admin.generateAuthToken()
        res.status(200).send({admin,token})
    }catch(err){
        res.status(400).send("Invalid Credentials")
    }
})

module.exports = router