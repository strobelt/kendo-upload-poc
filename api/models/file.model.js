'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new Schema({
    originalFileName: String,
    fileName: String,
    uploadDate: {
        type: Date,
        default: new Date()
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
})

module.exports = mongoose.model('File', FileSchema)