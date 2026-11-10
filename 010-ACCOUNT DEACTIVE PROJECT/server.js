require('dotenv').config({ path: "./config.env" })
const express=require('express')
const router=require('./routes/authroute')
const connectdb=require('./config/db')

const app=express()
app.use(express.json())
app.use('/api/deactive',router)

async function start(){

    try{
    connectdb()
    console.log('db is connected')


    app.listen(process.env.PORT,()=>{
        console.log('server is running')
    })

}catch(error){
    console.error('server error happens:',error.message)
     
    process.exit(1)

}


}


start()