//variables

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const router_main = require('./routers/rou-main')

const app = express()

//config

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

//listener

app.use('/', router_main)

app.listen(3000)