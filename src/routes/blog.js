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
router.get('/blogs',async(req,res)=>{
    try {
        const blogs = await Blog.find({})
        res.send(blogs)
    }catch(err){
        res.status(500).send
    }
})
router.get('/blogs/:id',async(req,res)=>{
    const _id = req.params.id
    try {
        const blog = await Blog.findById(_id)
        if(!blog){
            res.status(404).send("Not found")
        }
        res.send(tasks)
    }catch(err){
        res.status(500).send
    }
})


module.exports = router