const mongoose=require('mongoose')

async function connectdb(){
    const uri=process.env.MONGODB_URI
    if(!uri){
        throw new Error('set db connection string in .env file')
    }

    await mongoose.connect(uri)
    console.log('db is connected')
}

module.exports=connectdb