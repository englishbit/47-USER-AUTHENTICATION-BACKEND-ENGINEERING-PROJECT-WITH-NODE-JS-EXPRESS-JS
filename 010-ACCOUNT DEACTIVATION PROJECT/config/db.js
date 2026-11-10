const mongoose =require('mongoose')

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('db is connected')

    }catch(err){
        console.error('db is failed to connect',err.message)
        

    }
}

module.exports=connectdb