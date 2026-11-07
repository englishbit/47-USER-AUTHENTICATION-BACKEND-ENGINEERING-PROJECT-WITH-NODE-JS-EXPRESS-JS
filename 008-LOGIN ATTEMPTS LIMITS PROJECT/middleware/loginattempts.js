const {rateLimit}=require('express-rate-limit')

const signinlimit=rateLimit({ 
    windowMs:10*60*1000,
    limit:5,
    skipSuccessfulRequests:true,
    standardHeaders:true,
    legacyHeaders:false,
    message:{message:'try again after 10 minutes'},


})

module.exports=signinlimit
