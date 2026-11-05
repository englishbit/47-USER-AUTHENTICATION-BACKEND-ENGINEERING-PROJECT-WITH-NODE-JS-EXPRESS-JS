
//importing important packeges
const bcrypt=require('bcryptjs')
const {randomBytes}=require('crypto')
const User=require('../models/User')
const Session=require('../models/Session')


// core logic for developing sign in system
async function signin(req,res){
    try{
        const {email,password}=req.body
        
        // special case handling 
        if(typeof email !=='string'|| typeof password !=='string' || password.length<8){
            return res.status(400).json({message:"give correct email & password format"})
        }
       
        
        // prepare the email & finding in db user exist or not 
        const refinemail= email.trim().toLowerCase()
        const existuser=await User.findOne({email:refinemail})
        if(!existuser || await(!bcrypt.compare(password,existuser.passwordHash))){
            return res.status(401).json({message:'invalid email or password'})
        }

        // generate session id    
        const sessionId=randomBytes(32).toString('hex')
        const expireAt=new Date(Date.now()+60*60*1000)
        
        // save session id in db 
        await Session.create({
            sessionId,
            userId:existuser.id,
            expireAt,
        })


        // send sesssion token to browser
        res.cookie("sessionId",sessionId,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:'lax',
            path:'/',
            expires:expireAt,


        })


        return res.status(201).json({message:'sign in completed successfully'})





    }catch(error){
        return res.status(500).json({error:"Error arise! try again"})

    }
}

module.exports=signin