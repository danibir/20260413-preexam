const express = require('express')
const router = express.Router()

//controllers

const c_admin = require('../controllers/con-admin')

//middleware

const m_auth = require('../middleware/mid-auth')

//routing

router.use(m_auth.authAdmin)

router.get('/', c_admin.index_get)
router.get('/key/create', c_admin.createkey_get)
router.post('/key/create', c_admin.createkey_post)

//export

module.exports = router