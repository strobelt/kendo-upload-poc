'use strict'

const passport = require('passport')

module.exports = (app) => {
    const productController = require('../controllers/product.controller')
    const filesController = require('../controllers/file.controller')
    const loggedIn = () => passport.authenticate('jwt', { session: false })

    app.route('/products')
        .get(loggedIn(), productController.list_all_products)
        .post(loggedIn(), productController.create_product)

    app.route('/products/:productId')
        .get(loggedIn(), productController.read_product)
        .put(loggedIn(), productController.update_product)
        .delete(loggedIn(), productController.delete_product)

    app.route('/products/:productId/files')
        .get(loggedIn(), filesController.list)
        .post(loggedIn(), filesController.upload)

    app.route('/products/:productId/files/:fileId')
        .get(loggedIn(), filesController.download)
        .delete(loggedIn(), filesController.remove)
}