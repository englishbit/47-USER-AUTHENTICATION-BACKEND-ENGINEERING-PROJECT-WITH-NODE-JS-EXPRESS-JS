const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:30,
        default:"",

    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        
        maxlength:20,
        trim:true,
        default:"",
    },
    address:{
        type:String,
        
        trim:true,
        maxlength:300,

    },
    dateofbirth:{
        type:Date,
        
        default:null,
    },



})


module.exports=mongoose.model('User',userSchema)