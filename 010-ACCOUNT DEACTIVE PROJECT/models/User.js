const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },

    password:{
        type:String,
        required:true,

    },

    active:{
        type:Boolean,
        default:null,

    },
})

module.exports=mongoose.model("User",userSchema)