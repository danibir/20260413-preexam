//variables

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const os = require('os')
const env = require("dotenv")
env.config()

const mid_main = require('./middleware/mid-main')
const mid_auth = require('./middleware/mid-auth')

const router_main = require('./routers/rou-main')
const router_login = require('./routers/rou-login')
const router_admin = require('./routers/rou-admin')

const db = require('./handlers/han-db')

const app = express()

//config

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(mid_auth.auth)

//Connecting to db and starting server

db.connectToMongoDb()
.then(()=>{
    mid_main.dbSetStatus(true)
    console.log('Database connection success.')
})
.catch(()=>{
    mid_main.dbSetStatus(false)
    console.log('Database connection failure.')
})
.finally(()=>{
    app.use('/', router_main) 
    app.use('/login', router_login)
    app.use('/admin', router_admin)
    
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000 and on', os.hostname())
    })
})