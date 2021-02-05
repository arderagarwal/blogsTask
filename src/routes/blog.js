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

router.patch('/blogs/:id', auth , async(req,res)=>{
    const updates = Object.keys(req.body)
    try{
        const blog = await Blog.findOne({_id:req.params.id,author : req.user._id})
        if(!blog){
            res.status(404).send("Blog not found")
        }
        updates.forEach((update)=> blog[update]=req.body[update])
        await blog.save()
        res.send(blog)
    }catch(err){
        res.status(400).send("Bad Request")
    }
})

router.delete('/blogs/:id', auth , async(req,res)=>{
    try{
        const blog = await Blog.findOneAndDelete({_id:req.params.id,author : req.user._id})
        if(!blog){
            res.status(404).send("Not Found")
        }
        res.send(blog)
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router