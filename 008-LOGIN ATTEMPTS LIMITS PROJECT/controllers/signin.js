const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function signin(req,res){


    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(401).json({message:'email & password is required'})
        }



        if(typeof email !=='string' || typeof password !=='string'){
            return res.status(401).json({message:"email & password must be correct format"})

        }


        const refinemail=email.trim().toLowerCase()

        const existuser=await User.findOne({email:refinemail})



        if(!existuser || !(await bcrypt.compare(password,existuser.password))){
            return res.status(409).json({message:'invalid password or email'})
        }

        const token=jwt.sign(
            {userId:existuser._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn:"1h"},
        )

        return res.json({
            message:"sign in completed successfully",
            token,
            user:{
                id:existuser._id,
                email:existuser.email,
            }

        })



        

        


    }catch(error){
        console.error('sign in error arises',error)
        return res.status(500).json({message:'something went wrong'})

    }

}


module.exports=signin