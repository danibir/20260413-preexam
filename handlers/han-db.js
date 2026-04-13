const mongoose = require("mongoose")
 
async function connectToMongoDb() {
    let dbIP = "10.12.15.82"
    try {
        await connectHelper(dbIP, "node-server")
    } catch (err) {
        throw Error(`error on connect to mongodb: ${err}`)
    }
}
async function connectHelper(dbIP = 'localhost', dbName = "any") {
    try{
        await mongoose.connect(`mongodb://${dbIP}:27017/`, {dbName});
        console.log("Connected to mondoDB on collection: ", mongoose.connection.name);

    }catch(err){
        throw new Error(`Error on mongoDbHandler on path /handlers/mongoDbHandler.js. Error: ${err}`)
    }
}

module.exports = {connectToMongoDb}