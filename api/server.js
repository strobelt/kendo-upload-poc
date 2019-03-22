const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    busboy = require('connect-busboy'),
    Product = require('./models/product.model'),
    File = require('./models/file.model'),
    User = require('./models/user.model'),
    Log = require('./models/log.model'),
    passportRules = require('./passport'),
    loggedIn = () => require('passport').authenticate('jwt', { session: false }),
    userMw = require('./middlewares/user-logging.middleware')


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/ProductsDb', { useNewUrlParser: true })

const middlewares = [
    loggedIn(),
    userMw()
]

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
productRoutes(app, middlewares)

const logRoutes = require('./routes/log.routes')
logRoutes(app, [loggedIn()])

const userRoutes = require('./routes/user.routes')
userRoutes(app)

app.listen(port)

console.log('API listening on port ' + port)