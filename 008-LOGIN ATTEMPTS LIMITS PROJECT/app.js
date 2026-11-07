const signup=require('./controllers/signup')
const signin=require('./controllers/signin')
const signinlimit=require('./middleware/loginattempts')

const express=require('express')

const app=express()

app.use(express.json())

app.post('/signup',signup)
app.post('/signin',signinlimit,signin)

module.exports=app