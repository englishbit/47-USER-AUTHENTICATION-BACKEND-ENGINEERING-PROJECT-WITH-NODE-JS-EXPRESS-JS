const User=require('../models/User')
const jwt=require('jsonwebtoken')


async function emailchange(req,res){
    try{

        // extracting the jwt token for authentication
        const authHeader=req.headers.authorization
        const token=authHeader?.startsWith("Bearer ")?authHeader.slice("Bearer ".length):null

        if(!token){return res.status(401).json({message:'token must be needed'})}

        const payload=jwt.verify(token,process.env.JWT_SECRET)

        if(!payload){return res.status(400).json({message:'token is invalid'})}

        const {newemail}=req.body
        
        if(!newemail){
            return res.status(409).json({message:'filed is required'})
        }
        

        if(typeof newemail !=='string'){
            return res.status(401).json({message:'give email in correct format'})
        }

        const refinemail=newemail.trim().toLowerCase()

        const existuser=await User.findById(payload.userId)
        if(!existuser){return res.status(401).json({message:'user not found'})}

         existuser.email=refinemail
        await existuser.save()

        return res.status(201).json({message:'email has been changed successfully'})


    }catch(err){

        console.log({message:'sign up error arises',err })

        return res.status(500).json({message:'server error arises'})


    }
}


module.exports=emailchange