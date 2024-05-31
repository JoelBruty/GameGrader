const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        require: false
    }
})

module.exports = mongoose.model('Users')

