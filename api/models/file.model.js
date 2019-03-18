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
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
})

module.exports = mongoose.model('File', FileSchema)