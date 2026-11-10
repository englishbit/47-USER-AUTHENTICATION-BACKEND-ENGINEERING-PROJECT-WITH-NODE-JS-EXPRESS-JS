const User=require('../models/User')
const bcrypt=require('bcryptjs')
const {generateToken}=require('../middlewares/auth')


///////    core logic for sing up features     //////



async function signup(req,res){

    try{
        const {email,password}=req.body

        if(typeof email !=="string" || typeof password !=='string'){
            return res.status(401).json({message:'give valid email & password'})
        }

        if(password.length<8){
            return res.status(401).json({message:'password must be minimum 8 character'})

        }

        const refinemail=email.trim().toLowerCase()
        const existuser=await User.findOne({email:refinemail})

        if(existuser){
            return res.status(409).json({message:'user already exist'})
        }

        const passwordhash=await bcrypt.hash(password,12)

        await User.create({
            email:refinemail,
            password:passwordhash,
        })

        return res.status(201).json({message:'sign up completed successfully'})

    }catch(err){
        console.error(err.message)

        return res.status(500).json({message:'server error happpend'})


    }




}
//////////     core logic for sign in features         ////////////


async function signin(req,res){
    try{
        const {email,password}=req.body

        if(typeof email !=='string' || typeof password !== 'string'){
            return res.status(401).json({message:'give valid email & password'})
        }

        if(password.length<8){
            return res.status(401).json({message:'give password minimum 8 character'})
        }

        const refinemail=email.trim().toLowerCase()

        const existuser=await User.findOne({email:refinemail})
        if(!existuser || !(await bcrypt.compare(password,existuser.password))){
            return res.status(409).json({message:'invalid email or password'})
        }


        return generateToken(existuser,res)



    }catch(err){
        console.error(err.message)

        return res.status(500).json({message:'server erro arises'})

    }



}



//////     core logic for account deactivation       /////////////


async function deactive(req,res){

    try{
        const existuser=await User.findById(req.userId)

    if(!existuser){
        return res.status(409).json({message:'user not found'})
    }

    if(existuser.active == null || existuser.active == true){
        existuser.active=false
        await existuser.save()
        return res.status(201).json({message:'account deactivation is completed successfully'})
    }

    }catch(err){
        console.error(err.message)

        return res.status(500).json({message:'server error happens'})

    }
    
}


module.exports={signup,signin,deactive}





