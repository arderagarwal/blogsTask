const jwt = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,"randomSecret")
        const admin = await Admin.findOne({_id: decoded._id})

        if(!admin){
            throw new Error()
        }
        req.admin = admin
        next()

    }catch(err){
        res.status(401).send({error:'Please Authenticate'})
    }
}

module.exports = auth