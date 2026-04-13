const mongoose = require("mongoose")
const argon2 = require('argon2')
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
const crypto = require("crypto");
const SECRET = process.env.secretKey

function hashUsername(username) {
    return crypto
        .createHmac("sha256", SECRET)
        .update(username)
        .digest("hex")
}

//hash everything
userSchema.pre('save', async function () {
    if (this.isModified('username') && this.isAdmin == false) {
        this.username = hashUsername(this.username)
    }
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password)
    }
})
//login w both admin and user logic
userSchema.statics.login = async(username, password, admin) => {
    let name = username
    
    let user = await User.findOne({ username: name })
    if (!user || user.isAdmin == false) {
        name = hashUsername(username)
        user = await User.findOne({username: name })
    }
    if(!user) throw Error("Login fail.")
    
    const valid = await argon2.verify(user.password, password)
    if (!valid) throw Error("Login fail.")
    
    return user
}

//export
const User = mongoose.model('User', userSchema, 'users')
module.exports = User