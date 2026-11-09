// importing the requirments

const User=require('../models/User')
const bcrypt=require('bcryptjs')
const generateToken=require('../middlewares/generateToken')





//////////       core logic for signup system     ///////////////

async function signup(req,res){
    try{
        const {email,password}=req.body

        if(typeof email !=='string' || typeof password !=='string' || password.length<8){
            return res.status(400).json({message:"give a valid email & a 8 character password"})
        }

        const refinemail=email.trim().toLowerCase()

        const existuser=await User.findOne({email:refinemail})
        if(existuser){
            return res.status(409).json({message:'user is already exist'})
        }

        const hashpassword=await bcrypt.hash(password,12)

        const user=await User.create({
            email:refinemail,
            password:hashpassword,
        })

        return res.status(201).json({
            message:'sign up completed successfully',
            user:{
                userId:user._id,
                email:user.email,
            }
        })

    }catch(error){

        console.error(error)
        return res.status(500).json({message:'server error happend'})

    }
    
}





///////// core logic for signin system   ///////////////



async function signin(req,res){

    try{
        const {email,password}=req.body

        if(typeof email !=='string' || typeof password !=='string' || password.length<8){
            return res.status(401).json({message:'give valid email & minimum 8 character password'})
        }

        const refinemail=email.trim().toLowerCase()

        const existuser=await User.findOne({email:refinemail})
        if(!existuser  ||  !(await bcrypt.compare(password,existuser.password))){
            return res.status(401).json({message:'invalid email or password'})
        }

        return generateToken(existuser,res)




    }catch(error){
        console.error(error)
        return res.status(500).json({message:'server error happend'})



    }


}





///////////    core logic for update personal information      ////////////


async function updateinformation(req,res){
    try{

        

        const user=await User.findById(req.userId)
        if(!user){
            return res.status(409).json({message:'user not found'})
        }

        const {name,phone,address,dateofbirth}=req.body
        if(!name || !phone || !address || !dateofbirth){
            return res.status(401).json({message:'fill every fields'})
        }


         user.name=name
         user.phone=phone
         user.address=address
         user.dateofbirth=dateofbirth

        await user.save()

        return res.status(201).json({message:'information update successfully'})



    }catch(error){

        console.error(error)
        return res.status(500).json({message:'server error arises'})

    }
}




module.exports={signup,signin,updateinformation}