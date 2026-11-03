// importing imoportant library

require('dotenv').config()
const mongoose=require('mongoose')
const app=require('./app')

// capture the prot number & the db connection link
const PORT=process.env.PORT
const MONGO_URI=process.env.MONGODB_URI

async function start(){

    // connect db
    await mongoose.connect(MONGO_URI)

    // starting the server 
    app.listen(PORT,()=>{
        console.log('server is responding')
    })
}

start()