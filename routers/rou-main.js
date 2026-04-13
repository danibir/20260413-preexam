const express = require('express')
const router = express.Router()

//controllers

const c_main = require('../controllers/con-main')

//routing

router.get('/', c_main.index_get)


//export

module.exports = router