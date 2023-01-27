const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mew Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        requiired: true,
    }
})

const User = mongoose.model('user',UserSchema)
module.exports = User