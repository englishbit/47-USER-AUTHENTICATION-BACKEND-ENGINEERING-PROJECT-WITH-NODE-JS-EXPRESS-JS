const jwt=require('jsonwebtoken')

// core logic for private route to test jwt works or not 
async function private(req,res){

    // extracting the teken from request
    const authHeader=req.headers.authorization
    const token=authHeader?.startsWith("Bearer ")?authHeader.slice("Bearer ".length):null

    if(!token){
        return res.status(401).json({message:"token is must"})
    }

    try{

        // verity the token is valid or invalid
        const payload=jwt.verify(token,process.env.JWT_SECRET)

        
        return res.json({
            message:'you are allowed',
            userId:payload,
        })

    }catch{
        return res.status(401).json({message:"token is invalid"})

    }

}

module.exports=private