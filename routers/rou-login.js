const express = require('express')
const router = express.Router()

//controllers

const c_login = require('../controllers/con-login')

//middleware

const m_auth = require('../middleware/mid-auth')

//routing

router.post('/log-out', c_login.logout_post)
router.get('/sign-up', c_login.signup_get)
router.post('/sign-up', c_login.signup_post)

router.use(m_auth.reverseAuth)

router.get('/login', c_login.login_get)
router.post('/login', c_login.login_post)

router.get('/', (req, res) => {
    res.redirect('/login/login')
})

//export

module.exports = router