const Session=require('../models/Session')

// the logic of a simple private router to check sessio id works or not 
async function private(req,res){
    try{

        // capture the token
        const sessionid=req.cookies.sessionId

    if(!sessionid){
        return res.status(401).json({message:'please sign in at first'})
    }
     
    //find the token exist in db or not
    const token=await Session.findOne({sessionId:sessionid})


    // delet token from db & erase token from browser 
    if(!token || token.expiresAt<=new Date()){
        if(token){await token.deleteOne({_id:token._id})}

        
        res.clearCookie("sessionId",{path:'/'})


        return res.status(401).json({message:'session is invalid'})
    }

    return res.json({message:'hellow! you are allowed to get content'})

    }catch(error){
        return res.status(500).json({error:"Error arises Please try later"})
    }

}


module.exports=private