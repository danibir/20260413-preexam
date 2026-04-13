const express = require('express')
const router = express.Router()

//controllers

const c_main = require('../controllers/con-main')

//middleware

const m_auth = require('../middleware/mid-auth')

//routing

router.get('/', m_auth.auth,  c_main.index_get)

//export

module.exports = router