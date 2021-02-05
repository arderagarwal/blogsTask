const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
userSchema.virtual('blogs',{
    ref: 'Blog',
    localField : '_id',
    foreignField : 'author'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"randomSecret")
    return token
}
userSchema.statics.findByCredentials = async (userName,password) => {
    const user = await User.findOne({userName})
    if(!user){
        console.log("ughhhhh")
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
   next()
})
const User = mongoose.model('User',userSchema)

module.exports = User 