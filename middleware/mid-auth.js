const jwt = require("jsonwebtoken")
const User = require('../models/mod-user')

//JWT token verification
const auth = async (req, res, next) => {
    const token = req.cookies?.user
    if (token) {
        const payload = jwt.verify(token, process.env.secretKey)
        const user = await User.findOne({ username: payload.username })
        if (!user || user.isAdmin == false) {
            res.locals.name = ""
        } else {
            res.locals.name = user.username
        }
        next()
    } else {
        return res.redirect("/login/login")
    }
}
const authAdmin = async (req, res, next) => {
    const token = req.cookies?.user
    const username = jwt.verify(token, process.env.secretKey).username
    const user = await User.userExists(username)
    if (!user || user.isAdmin == false) {
        return res.redirect('/')
    }

    next()
}

module.exports = {
    auth,
    authAdmin
}