require('dotenv').config({path:'.env'})
const mongoose = require('mongoose')

mongoose.connection.on('open',async()=>{
  try {
    await console.log('Database connect')
  } catch (error) {
    console.log(`Error connect database: ${error}`)
  }
})

async function connectDatabase({url}) {
  await mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
  })
}

module.exports = {connectDatabase}