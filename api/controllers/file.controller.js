'use strict'

const fs = require('fs'),
    path = require('path'),
    appDir = path.dirname(require.main.filename),
    filesDir = path.join(appDir, 'files'),
    shortId = require('shortid'),
    mongoose = require('mongoose'),
    File = mongoose.model('File'),
    Product = mongoose.model('Product')

const getPath = (fileName) =>
    path.join(filesDir, fileName)

const generateSafePath = (fileName) =>
    getPath(generateSafeFileName(fileName))

const generateSafeFileName = (fileName) =>
    shortId.generate().concat(path.extname(fileName))

exports.upload = function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (_fieldName, file, fileName) {
        const filePath = generateSafePath(fileName)
        const fstream = fs.createWriteStream(filePath)
        fstream.on('close', () => {
            new File({
                originalFileName: fileName,
                fileName: path.basename(filePath),
                product: req.params.productId,
                owner: req.user._id
            }).save((err, file) => {
                if (err)
                    res.send(err)
                Product.findById(file.product, function (err, product) {
                    if (err)
                        res.send(err)
                    if (!product.files) product.files = []
                    product.files.push(file)
                    product.save()
                    res.status(200).send(file)
                })
            })
        })
        file.pipe(fstream)
    })
}

exports.download = function (req, res) {
    File.findOne({ _id: req.params.fileId, product: req.params.productId },
        (err, file) => {
            if (err)
                res.send(err)
            res.download(getPath(file.fileName))
        })
}

exports.list = (req, res) =>
    File.find({ product: req.params.productId },
        (err, files) => {
            if (err)
                res.send(err)
            res.json(files)
        })

exports.remove = (req, res) =>
    File.findOneAndRemove({ product: req.params.productId, _id: req.params.fileId },
        (err, file) => {
            if (err) res.send(err)
            Product.findOne({ _id: req.params.productId }, (err, product) => {
                if (err) res.send(err)
                const index = product.files.findIndex(f => f._id.toString() == file._id.toString())
                product.files.splice(index, 1)
                product.save()
                res.status(200).send()
            })
        })