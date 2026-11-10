const express=require('express')
const {signup,signin,deactive}=require('../controllers/authentication')
const {generateToken,verifyToken}=require('../middlewares/auth')


const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.patch('/deactive',verifyToken,deactive)

module.exports=router