const mongoose = require("mongoose")
const argon2 = require('argon2')
const Schema = mongoose.Schema

//define schema
const reportSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: []
    },
    notes: {
        type: Array,
        default: []
    }
})

const Report = mongoose.model('Report', reportSchema, 'reports')
module.exports = Report