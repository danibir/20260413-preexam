const crypto = require('crypto')
//hmac hash
const SECRET = "super-secret"//process.env.secretKey

function hashUsername(username) {
    return crypto
        .createHmac("sha256", SECRET)
        .update(username)
        .digest("hex")
}

module.exports = hashUsername