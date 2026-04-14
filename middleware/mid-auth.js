const jwt = require("jsonwebtoken")
const User = require('../models/mod-user')

//JWT token verification
const auth = async (req, res, next) => {
    const token = req.cookies?.user
    if (token) {
        const payload = jwt.verify(token, "my_jwt_secret_for_now")
        const user = await User.userExists(payload.username)
        console.log(user)
        if (!user || user.isAdmin == false) {
            res.locals.name = "Anonym bruker"
        } else {
            res.locals.name = payload.username
        }
        next()
    } else {
        return res.redirect("/login/login")
    }
}
const authAdmin = async (req, res, next) => {
    const token = req.cookies?.user
    const username = jwt.verify(token, "my_jwt_secret_for_now").username
    const user = await User.userExists(username)
    console.log(user)
    if (!user || user.isAdmin == false) {
        return res.render('403')
    }

    next()
}

module.exports = {
    auth,
    authAdmin
}