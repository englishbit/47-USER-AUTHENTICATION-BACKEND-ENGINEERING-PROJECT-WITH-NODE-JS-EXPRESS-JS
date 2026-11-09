const express=require('express')
const {signup,signin,updateinformation}=require('../controllers/usercontrollers')
const verifyToken=require('../middlewares/verifyToken')


const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.patch('/updateinformation',verifyToken,updateinformation)


module.exports=router