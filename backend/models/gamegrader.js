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
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    wishlist: {
        type: Array,
        required: false
    }
})

const reviewSchema = new Schema({
    reviewRating: {
        type: Number,
        required: true
    },
    reviewComment: {
        type: String,
        required: false
    },
    reviewDate: {
        type: Date,
        required: true
    },
    reviewEdited: {
        type: Date,
        required: false
    },
    reviewLanguage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', userSchema), mongoose.model('Reviews', reviewSchema)