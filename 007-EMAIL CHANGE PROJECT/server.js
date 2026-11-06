require('dotenv').config()
const mongoose=require('mongoose') 

const app=require('./app')
const PORT=process.env.PORT

async function start(){
    if(!process.env.MONGODB_URI){
        throw new Error('set db connection string in .env file')

    }

    if(!process.env.PORT){
        throw new Error('set port number in .env file')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('db is connected')

    app.listen(PORT,()=>{
        console.log('server is responding')
    })

}

start()