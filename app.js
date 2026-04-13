//variables

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const os = require('os')
const env = require("dotenv")
env.config()

const router_main = require('./routers/rou-main')
const router_login = require('./routers/rou-login')

const db = require('./handlers/han-db')

const app = express()

//config

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

//Connecting to db and starting server

db.connectToMongoDb()
.then(()=>{
    console.log('Database connection success.')
})
.catch(()=>{
    console.log('Database connection failure.')
})
.finally(()=>{
    app.use('/', router_main) 
    app.use('/login', router_login)
    
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000 and on', os.hostname())
    })
})