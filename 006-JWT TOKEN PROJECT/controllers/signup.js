//importing important packeges
const bcrypt=require('bcryptjs')
const User=require('../models/User')


// core logic for signup features
async function signup(req,res){
    try{

        const {email,password}=req.body
        
        // special case handling
        if(typeof email !=='string' || typeof password!=='string'||password.length<=8){
            return res.status(400).json({message:"email & password is need text data& password is need minimum 8 character"})
        }

        // find the user is exist or not 
        const refineemail=email.trim().toLowerCase()
        const existuser=await User.findOne({email:refineemail})

        if(existuser){return res.status(409).json({message:"user exist!"})}

        // hashing the password
        const hashpassword=await bcrypt.hash(password,12)

        // save user information in db  
        const user=User.create({
            email:refineemail,
            password:hashpassword,
        })

        return res.status(201).json({message:"signup completed successfully"})



    }catch(error){
          console.error('signup error',error)
          return res.status(500).json({message:'something went wrong'})
    }
}


module.exports =signup