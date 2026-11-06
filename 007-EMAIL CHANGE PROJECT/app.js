const signup=require('./controllers/signup')
const signin=require('./controllers/signin')
const emailchange=require('./controllers/emailchange')
const express=require('express')
const app=express()

app.use(express.json())

app.post('/signup',signup)
app.post('/signin',signin)
app.patch('/emailchange',emailchange)

module.exports=app