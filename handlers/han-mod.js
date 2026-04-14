const User = require('../models/mod-user')
const Signkey = require('../models/mod-signkey')
const hashUsername = require('../util/hashname')
const argon2 = require('argon2')
const crypto = require('crypto')


//login
const signup = async(username, password, key) => {
    const normalized = username.trim().toLowerCase()
    const name = hashUsername(normalized)
    const userExists = await User.exists({ username: name })
    if(userExists) return
    
    const validKey = await verifyKey(username, key)
    if (!validKey) return

    const userObj = {
        username: username,
        password: password,
        isAdmin: validKey == "ADMIN",
        birthkey: key
    }
    const user = new User(userObj)
    await user.save()
    console.log('success signup')
    return user
}
const login = async(username, password) => {
    console.log('logging in')
    const normalized = username.trim().toLowerCase()
    const name = hashUsername(normalized)
    const user = await User.findOne({ username: name })
    if(!user) return console.log('noUser')
    
    const valid = await argon2.verify(user.password, password)
    if (!valid) return console.log('noPass')
        
    return user
}
const userExists = async(username) => {
    console.log('calling user')
    console.log(username)
    const normalized = username.trim().toLowerCase()
    const name = hashUsername(normalized)
    console.log(name)
    const user = await User.findOne({ username: name })
    if(!user) return console.log('no user found')

    return user
}
const generateKey = async (username, isAdmin, origin) => {
    let key = crypto.randomBytes(16).toString("hex")
    if (isAdmin) {
        if (!origin) throw new Error('admin key: no origin provided')
        const originUser = (await userExists(origin))
        if (!originUser) throw new Error('originUser not valid')
        key = `!AR-${originUser._id}-${key}`
    }

    const keyobj = {
        username: username,
        key: key,
    }
    const signedkey = new Signkey(keyobj)
    await signedkey.save()
    return signedkey
}

const verifyKey = async(username, key) => {
    console.log("verify key")
    const name = hashUsername(username)
    const user = await User.findOne({ username: name })
    if(user) return console.log('user exists')
    const signupkey = await Signkey.findOne({ key: key })
    if (!signupkey) return console.log('no key')
    if (signupkey.username != name) return await keyFailAttempt(signupkey)

    await Signkey.findByIdAndDelete(signupkey._id)
    console.log('deleted signkey')
    console.log(key.slice(0, 3))
    if (key.slice(0, 4) == '!AR-') return "ADMIN"
    else return "USER"
}

const keyFailAttempt = async (signupkey) => {
    signupkey.useAttempts++
    if (signupkey.useAttempts > 500) return await Signkey.findByIdAndDelete(signupkey._id)

    await signupkey.save()
    return console.log('wrong user')
}

module.exports = {
    signup,
    login,
    userExists,
    generateKey,
    verifyKey
}