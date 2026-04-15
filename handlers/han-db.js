const mongoose = require("mongoose");

const mainDb = mongoose.createConnection(
  "mongodb://10.12.15.82:27017/node-server"
)

const reportDb = mongoose.createConnection(
  "mongodb://10.12.15.83:27017/reports"
)

mainDb.on("connected", () => console.log("Main DB connected"))
reportDb.on("connected", () => console.log("Report DB connected"))

module.exports = { 
    mainDb, 
    reportDb
}