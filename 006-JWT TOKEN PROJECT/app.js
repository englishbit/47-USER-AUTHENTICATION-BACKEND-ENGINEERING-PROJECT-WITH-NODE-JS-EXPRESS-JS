// importing important library

const express=require('express')
const cookieparser=require('cookie-parser')

const app=express()

// using some whole app midlleware
app.use(express.json())
app.use(cookieparser())

const signup=require('./controllers/signup')
const signin=require('./controllers/signin')
const private=require('./controllers/private')

// calling all api
app.post('/signup',signup)
app.post('/signin',signin)
app.get('/private',private)


module.exports=app