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
    }
})

//hmac hash
const crypto = require("crypto");
const SECRET = process.env.secretKey

console.log(SECRET)

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
userSchema.statics.login = async(username, password)=>{
    const hashedusername = hashUsername(username)
    const user = await User.findOne({username: hashedusername })
    if(!user) throw Error("Login fail.")
    
    const valid = await argon2.verify(user.password, password)
    if (!valid) throw Error("Login fail.")
    
    return user._id
}

//export
const User = mongoose.model('User', userSchema, 'users')
module.exports = User