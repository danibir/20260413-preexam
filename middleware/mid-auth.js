const jwt = require("jsonwebtoken")
const User = require('../models/mod-user')
const han = require('../handlers/han-mod')

//JWT token verification
const auth = async (req, res, next) => {
    const token = req.cookies?.user
    console.log('auth')
    if (token) {
        try {
            const payload = jwt.verify(token, "my_jwt_secret_for_now")
            console.log(payload)
            const user = await han.userExists(payload.username)
            if (user.isAdmin == false) {
            console.log('user')
                res.locals.name = "Anonym bruker"
                res.locals.loggedIn = true
            } else {
            console.log('admin')
                res.locals.name = payload.username
                res.locals.isAdmin = true
                res.locals.loggedIn = true
                req.user = payload.username
            }
            return next()
        } catch (err) {
            console.log(err)
            res.clearCookie('accessToken')
            return res.redirect('/login/login')
        }
    } else {
        console.log('no token auth')
        return res.redirect("/login/login")
    }
}
const reverseAuth = (req, res, next) => {
    const token = req.cookies?.user
    if (token) return res.redirect('/')
    next()
}

const authAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status('error', { error: "403 - Forbidden" })
    }

    next()
}

module.exports = {
    auth,
    reverseAuth,
    authAdmin
}