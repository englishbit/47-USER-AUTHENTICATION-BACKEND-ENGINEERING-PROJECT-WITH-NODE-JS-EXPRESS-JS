const jwt=require('jsonwebtoken')

async function generateToken(user,res){
    const token=jwt.sign(
        {userId:user._id.toString()},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )

    return res.status(200).json({
        message:'sign in has been successfully',
        token,
        user:{
            user:user._id,
            name:user.name,
            email:user.email,

        }
    })
}


module.exports=generateToken