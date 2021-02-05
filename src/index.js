const express = require('express')
require('./db/mongoose')
const User = require('./db/models/users')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.get('',(req,res)=>{
    res.send("welcome")
})
app.use(userRouter)

app.listen(port, ()=>{
    console.log("We are live at "+port)
})