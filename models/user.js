const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    favoriteColor: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)