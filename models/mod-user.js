const argon2 = require('argon2')
const crypto = require("crypto")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//define schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

//hmac hash
const SECRET = process.env.secretKey

function hashUsername(username) {
    return crypto
        .createHmac("sha256", SECRET)
        .update(username)
        .digest("hex")
}

//hash everything
userSchema.pre('save', async function () {
    if (this.isModified('username')) {
        this.username = hashUsername(this.username)
    }
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password)
    }
})
//login
userSchema.statics.login = async(username, password) => {
    const name = hashUsername(username)
    const user = await User.findOne({ username: name })
    if(!user) return
    
    const valid = await argon2.verify(user.password, password)
    if (!valid) return
        
    return user
}
userSchema.statics.userExists = async(username) => {
    const name = hashUsername(username)
    const user = await User.findOne({ username: name })
    if(!user) return

    return !!user
}

//export
const User = mongoose.model('User', userSchema, 'users')
module.exports = User