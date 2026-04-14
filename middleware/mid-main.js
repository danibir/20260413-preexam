//sets status for database into req, so controller knows weither its connected or not
// - true or false please
const dbSetStatus = (status) => (req, res, next) => {
    req.isDBConnected = status
    res.locals.dbFail = !status
    if (!status) {
        res.clearCookie('user')
    }
    next()
}

const setLocals = (req, res, next) => {
    res.locals.name = "NaN"
    res.locals.isAdmin = false
    res.locals.loggedIn = false
    res.locals.title = "Side..."
    req.user = NaN
    next()
}

const dbReject503 = (req, res, next) => {
    if (!req.isDBConnected){
        return res.status(503).render("error", { error: "Service unavailable: database is unavailable." })
    }
    next()
}

module.exports = {
    dbSetStatus,
    setLocals,
    dbReject503
}