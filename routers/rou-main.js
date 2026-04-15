const express = require('express')
const router = express.Router()

//controllers

const c_main = require('../controllers/con-main')

//middleware

const m_auth = require('../middleware/mid-auth')

//routing

router.get('/', m_auth.authRestrain, c_main.index_get)
router.get('/faq', c_main.faq_get)

//export

module.exports = router