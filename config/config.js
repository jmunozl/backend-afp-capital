require('dotenv').config({path:'.env'})
const config = {
  appConfig: {
    port: process.env.PORT || 5000,
  },
  dbConfig: {
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/afpcapital",
  },
}

module.exports = config