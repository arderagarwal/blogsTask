const express = require('express')
const Blog = require('../db/models/blogs')
const auth = require('../middleware/userAuth')
const router = new express.Router()

router.post('/blogs', auth , async (req,res)=>{
    const blog = new Blog({
        ...req.body,
        author : req.user._id
    })
    try{
        await blog.save()
        res.status(201).send(blog)
    }catch(err){
        res.status(400).send(err)
    }
})


module.exports = router