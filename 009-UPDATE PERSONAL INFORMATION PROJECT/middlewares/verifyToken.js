const jwt=require('jsonwebtoken')

async function verifyToken(req,res,next){

    const authorization=req.headers.authorization

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.status(401).json({message:"token is need"})
    }

    const token=authorization.slice("Bearer ".length)

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId
        next()

    }catch{
        return res.status(401).json({message:"token is invalid"})

    }


}

module.exports=verifyToken