const mongoose=require('mongoose')


// the blue print of db modle for session token
const sessionSchema=new mongoose.Schema({
    sessionId:{
        type:'string',
        required:true,
        unique:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },

    expireAt:{
        type:Date,
        required:true,
    },
},{timestamp:true})


module.exports=mongoose.model("Session",sessionSchema)