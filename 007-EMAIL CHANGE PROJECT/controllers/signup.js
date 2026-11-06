const User=require('../models/User')
const bcrypt=require('bcryptjs')

// CORE LOGIC FOR SIGN UP FEATURES
async function signup(req,res){
    try{
        const {email,password}=req.body

        // SPECIAL CASE HANDLING
        if(typeof email !=="string" || typeof password !=='string'){
            return res.status(401).json({message:'only charecter is required'})
        }

        if(password.length<8){
            return res.status(401).json({message:"minimum give 8 length password"})

        }

        // PREPARE EMAIL & FIND IN DB
        const refinemail=email.trim().toLowerCase()

        const existuser=await User.findOne({email:refinemail})
        if(existuser){
            return res.status(409).json({message:'this email is already used'})
        }

        //HASHING THE PASSWORD
        const hashpassword=await bcrypt.hash(password,12)

        // STORE INFORMATION IN DB
        await User.create({
            email:refinemail,
            password:hashpassword,
        })


        return res.status(201).json({message:'account created successfully'})


    }catch(err){
        console.log(err.message)
        return res.status(400).json({message:'something went wrong happening'})

    }

}


module.exports=signup
