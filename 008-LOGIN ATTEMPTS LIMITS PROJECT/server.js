require('dotenv').config()
const mongoose=require('mongoose')
const app=require('./app')

const PORT=process.env.PORT

async function start(){
    try{
        if(!PORT){
        throw new Error('set port number in .env file')
    }

    if(!process.env.MONGODB_URI){
        throw new Error('set db connection string in .env file')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('db connection is successful')

    app.listen(PORT,()=>{
        console.log('server is running')
    })


    }catch(err){
        console.error('server has been failed',err)

    

    }
    
}

start()