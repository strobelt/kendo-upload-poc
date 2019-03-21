const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    busboy = require('connect-busboy')

require('./models/product.model')
require('./models/file.model')
require('./models/user.model')
require('./passport')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/ProductsDb', { useNewUrlParser: true })

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    next()
}
app.use(allowCrossDomain)
app.use(busboy())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const productRoutes = require('./routes/product.routes')
productRoutes(app)

const userRoutes = require('./routes/user.routes')
userRoutes(app)

app.listen(port)

console.log('API listening on port ' + port)