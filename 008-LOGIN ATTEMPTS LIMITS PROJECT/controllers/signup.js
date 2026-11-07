const User=require('../models/User')
const bcrypt=require('bcryptjs')

async function signup(req,res){
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(401).json({message:'tow fields are required'})

        }

        if(typeof email !=='string' || typeof password!=='string'){
            return res.status(401).json({message:'give correct format fo email & password'})
        }

        const refinemail=email.trim().toLowerCase()
        const existuser=await User.findOne({email:refinemail })
        if(existuser){
            return res.status(409).json({message:'this email is already used '})
        }

        const hashpassword=await bcrypt.hash(password,12)

        await User.create({
            email:refinemail,
            password:hashpassword,
        })

        return res.status(201).json({message:'account created successfully'})


    }catch(error){
        console.log('erro arises',error)

        return res.status(500).json({Error:'server error is arises'})


    }


 







}


   module.exports=signup
