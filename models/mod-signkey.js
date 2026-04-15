//one time use sign-up keys 

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hashUsername = require('../util/hashname')
const db = require('../handlers/han-db.js')

const userKeySchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    key: { 
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 *2 // 2 hour
    },
    useAttempts: { 
        type: Number,
        default: 0
    }
})

userKeySchema.pre('save', async function () {
    if (this.isModified('username')) {
        this.username = hashUsername(this.username)
    }
})



const Signkey = db.mainDb.model('Signkey', userKeySchema, 'signup-keys')
module.exports = Signkey