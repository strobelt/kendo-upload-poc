'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
    method: String,
    url: String,
    params: String,
    body: String,
    userId: String,
    username: String,
    date: {
        type: Date,
        default: Date.now,
        setDefaultsOnInsert: true
    }
})

module.exports = mongoose.model('Log', LogSchema)