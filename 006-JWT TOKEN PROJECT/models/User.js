const mongoose=require('mongoose')

// the blue print of db model
const UserSchema=new mongoose.Schema({
    email:{
        required:true,
        unique:true,
        type:'string',
        trim:true,
        lowercase:true,
    },

    password:{
        type:'string',
        required:true,
    }
},{timestamp:true})

// building model & export it 
module.exports=mongoose.model("User",UserSchema)