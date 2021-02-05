const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    adminName : {
        type: String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
adminSchema.methods.generateAuthToken = async function(){
    const admin = this
    const token = jwt.sign({_id:admin._id.toString()},"randomSecret")
    return token
}
adminSchema.statics.findByCredentials = async (adminName,password) => {
    const admin = await Admin.findOne({adminName})
    if(!admin){
        console.log("ughhhhh")
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,admin.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return admin
}
adminSchema.pre('save',async function(next){
    const admin = this
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password,8)
    }
   next()
})
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin 