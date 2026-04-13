//import
const User = require('../models/mod-user')
const jwt = require("jsonwebtoken")

//login page
const login_get = (req, res) => {
    res.render('login')
}

//login post logic
const login_post = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        login_perform(res, username, password)
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
        if(key === process.env.authKey) {
            console.log('entered key')
            const user = new User({
                username: username,
                password: password
            })
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
    res.clearCookie('accessToken')
    res.redirect('/login/login')
}


//login handler
const login_perform = async (res, username, password) => {
    try {
        const userId = await User.login(username, password)
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '120m' })
        res.cookie('accessToken', token, { httpOnly: true, sameSite: 'strict'})
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