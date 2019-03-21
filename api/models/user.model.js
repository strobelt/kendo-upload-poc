'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String //Hashed
})

module.exports = mongoose.model('User', UserSchema)