const User=require('../models/User')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


// the core logic for sing in features
async function signin(req,res){
    try{

        const {email,password}=req.body


        // special case handling 
        if(!email || !password){
            return res.status(400).json({message:"email & password is required"})
        }

        if(typeof email!=='string' || typeof password !=='string'){
            return res.status(400).json({message:"email & password must need string"})
        
        }

        // finding the user
        const existuser=await User.findOne({email:email.trim().toLowerCase()})

        if(!existuser||!(await bcrypt.compare(password,existuser.password))){
            return res.status(401).json({message:'email or password is invalid'})
        }

        // genertating the token
        const token=jwt.sig n(
            {userId:existuser._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        )
        
        // sending the token to browser
        return res.json({
            message:'sign in completed successfully',
            token,
            user:{id:existuser._id,email:existuser.email}
        })

    }catch(error){
        console.error('sign in error happens',error)
        return res.status(500).json({message:"something went wrong"})





    }


}

module.exports=signin