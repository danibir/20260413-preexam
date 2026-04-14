//import
const User = require('../models/mod-user')
const Signkey = require('../models/mod-signkey')
const han = require('../handlers/han-mod')
const jwt = require("jsonwebtoken")

//login page
const login_get = (req, res) => {
    res.render('login')
}

//login post logic
const login_post = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await login_perform(res, username, password)
        if (user) return res.redirect('/')

        res.redirect('./login')
    } catch (err) {
        console.log(`Login post error: ${err}`)
        res.redirect('./login')
    }
}

//signup page
const signup_get = (req, res) => {
    res.render('signup')
}

//signup post logic
const signup_post = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const key = req.body.key
    try {
        const signup = await han.signup(username, password, key)
        if (!signup) return res.redirect('./sign-up')
        const login = await login_perform(res, username, password)
        if (login) return res.redirect('/')
        res.redirect('./sign-up')
    } catch(err) {
        console.log(`Sign-up post error: ${err}`)
        res.redirect('./sign-up')
    }
}

//log out
const logout_post = (req, res) => {
    res.clearCookie('user')
    res.redirect('./login')
}


//login handler
const login_perform = async (res, username, password) => {
    try {
        const login = await han.login(username, password)
        if (!login) return console.log('incredential fails')

        const token = jwt.sign({ username }, "my_jwt_secret_for_now", { expiresIn: '120m' })
        res.cookie('user', token, { httpOnly: true, sameSite: 'strict'})
        console.log('login success')
        console.log(login)
        return login
    } catch (err) {
        throw new Error(`Login perform error: ${err}`)
    }
}


//export
module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_post
}