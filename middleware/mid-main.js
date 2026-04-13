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

const checkUserCookie = (req, res, next) => {
    const token = req.cookie.user
    next()
}

const dbReject503 = (req, res, next) => {
    if (!req.isDBConnected){
        return han.renderErrorPage(res, 503, "Service unavailable: database is unavailable, come back later.")
    }
    next()
}

module.exports = {
    dbSetStatus,
    checkUserCookie,
    dbReject503
}