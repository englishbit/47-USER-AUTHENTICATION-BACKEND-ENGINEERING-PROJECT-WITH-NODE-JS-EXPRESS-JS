const bcrypt=require('bcryptjs')
const User=require('../models/User')


// the core logic of sign up 
async function signup(req,res){
    try{
        //special case handling 
        const {email,password}=req.body
        if(typeof email !=='string'||typeof password !=='string'||!email.trim().toLowerCase()|| password.length<8 ){
            return res.status(400).json({message:"enter correct email & at least 8 charecter password"})
        }

        //prepare the email
        const refinemail=email.trim().toLowerCase()
        
        //find the in db user exist or not 
        const existuser=await User.findOne({email:refinemail})
        if(existuser){
            return res.status(409).json({message:'this email is used'})
        }
        // hashing the password 
        const passwordHash=await bcrypt.hash(password,12)
        
        //save user information in db

        await User.create({
            email:refinemail,
            passwordHash
        })

        return res.status(201).json({message:'sign up completed successfully'})

    }catch(error){
        console.error("Signup error:", error);
        return res.status(500).json({error:'Error arises & try again'})

    }
}

module.exports=signup