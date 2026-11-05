// importing the requirements

require('dotenv').config()
const mongoose=require('mongoose')
const app=require('./app')
// reading the port
const PORT=process.env.PORT

// connecting the db & starting the server
async function start(){
    if(!process.env.MONGODB_URI){
        throw new Error("set mongo uri in .env file")
    }
    if(!process.env.JWT_SECRET){
        throw new Error("set jwt secret in .env file")
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('db is connected')

    app.listen(PORT,()=>{
        console.log('server is responding')
    })
}


start()