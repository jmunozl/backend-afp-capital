require('dotenv').config({path:'.env'})
const app = require('./config/app')
const {connectDatabase}= require('./database/config')
const {appConfig,dbConfig} = require('./config/config')

async function initApp(appConfig,dbConfig) {
  try {
    await connectDatabase(dbConfig)
    app.set('port',appConfig.port)
    app.listen(app.get('port'),()=>{
      console.log(`Listen port on: ${app.get("port")}`)
    })
  } catch (error) {
    console.log(error);
    process.exit(0)
  }
}

initApp(appConfig,dbConfig)

module.exports = app
