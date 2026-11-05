//importing important library

const express=require('express')
const signup=require('./controllers/signup')
const signin=require('./controllers/signin')
const private=require('./controllers/private')

const app=express()
//moddleware
app.use(express.json())
 
//calling the apis
app.post('/signup',signup)
app.post('/signin',signin)
app.get('/private',private)

module.exports=app