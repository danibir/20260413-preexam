//import
const User = require('../models/mod-user')
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
        await login_perform(res, username, password)
    } catch (err) {
        console.log(`Login post error: ${err}`)
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
    console.log('entered signup')
    try {
        if(key === process.env.authKey || key === process.env.adminKey) {
            console.log('entered key')
            const userObj = {
                username: username,
                password: password
            }
            if (key === process.env.adminKey) userObj.isAdmin = true
            const user = new User(userObj)
            await user.save()
            await login_perform(res, username, password)
            console.log('entered login')
        }
    } catch(err) {
        console.log(`Sign-up post error: ${err}`)
    }
}

//log out
const logout_post = (req, res) => {
    res.clearCookie('user')
    res.redirect('/login/login')
}


//login handler
const login_perform = async (res, username, password) => {
    try {
        await User.login(username, password)
        const token = jwt.sign({ username }, process.env.secretKey, { expiresIn: '120m' })
        res.cookie('user', token, { httpOnly: true, sameSite: 'strict'})
        console.log('signup successful')
        res.redirect('/')
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