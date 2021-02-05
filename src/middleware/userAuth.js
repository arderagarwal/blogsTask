const jwt = require('jsonwebtoken')
const User = require('../db/models/users')

const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,"randomSecret")
        const user = await User.findOne({_id: decoded._id})

        if(!user){
            throw new Error()
        }
        req.user = user
        next()

    }catch(err){
        res.status(401).send({error:'Please Authenticate'})
    }
}

module.exports = auth