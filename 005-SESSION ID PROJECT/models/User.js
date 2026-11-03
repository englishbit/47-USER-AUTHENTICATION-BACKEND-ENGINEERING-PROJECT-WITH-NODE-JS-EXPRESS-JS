const mongoose=require('mongoose')
// the blue print to store user information in db modles 
const Userschema=new mongoose.Schema({
    email:{
        type:"string",
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    passwordHash:{
        type:"string",
        required:true,
    },

},{timestamp:true})

module.exports=mongoose.model("User",Userschema)