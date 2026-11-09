const express=require('express')
const router=require('./routes/userroutes')
const connectdb=require('./config/db')
require('dotenv').config()

const app=express()

app.use(express.json())
app.use("/api/user",router)



async function start(){

    try{
        await connectdb()
    console.log('db is connected')

    app.listen(process.env.PORT,()=>{
        console.log('server is running')
    })

    }catch(error){
        console.error('server error happens',error.message)
        process.exit(1)


    }
    
}

start()