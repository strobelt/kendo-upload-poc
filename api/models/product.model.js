'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: String,
    supplierId: Number,
    categoryId: Number,
    quantityPerUnit: String,
    unitPrice: Number,
    unitsInStock: Number,
    unitsOnOrder: Number,
    reorderLevel: Number,
    discontinued: Boolean,
    category: {
        categoryId: Number,
        categoryName: String,
        description: String
    },
    firstOrderedOn: Date,
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }]
})

module.exports = mongoose.model('Product', ProductSchema)