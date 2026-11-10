const jwt=require('jsonwebtoken')

//////        core logic for generate token & send to browser        /////////////


async function generateToken(user,res){
    try{
        const token=jwt.sign(
            {userId:user._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN},
        )

        return res.status(200).json({
            message:"sign in successfully completed",
            token,
            user:{
                userId:user._id,
                email:user.email,
            }
        })

    }catch(error){
        console.error(error.message)

        return res.status(500).json({message:'server error happens'})

    }
}





//////////        core logic for verify token      ///////////



async function verifyToken(req,res,next){
    try{
        const authorization=req.headers.authorization

        if(!authorization || !authorization.startsWith("Bearer ")){
            return res.status(401).json({message:'token is needed to verify'})

        }

        const token=authorization.slice("Bearer ".length)
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId
        next()
        
    }catch(error){

        console.error(error.message)

        return res.status(500).json({message:'server error happens'})

    }
}




module.exports={generateToken,verifyToken}