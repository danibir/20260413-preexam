const express = require('express')
const router = express.Router()

//controllers

const c_report = require('../controllers/con-report')

//middleware

const m_auth = require('../middleware/mid-auth')

//routing

router.get('/create', c_report.create_get)
router.post('/create', c_report.create_post)
router.use(m_auth.authAdmin)
router.get('/view/:id', c_report.view_get)
router.get('/edit/:id', c_report.edit_get)
router.post('/edit/:id', c_report.edit_post)

//export

module.exports = router