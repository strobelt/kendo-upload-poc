'use strict'

const passport = require('passport')

module.exports = (app) => {
    const productController = require('../controllers/product.controller')
    const filesController = require('../controllers/file.controller')

    app.route('/products')
        .all(passport.authenticate('jwt', { session: false }))
        .get(productController.list_all_products)
        .post(productController.create_product)

    app.route('/products/:productId')
        .all(passport.authenticate('jwt', { session: false }))
        .get(productController.read_product)
        .put(productController.update_product)
        .delete(productController.delete_product)

    app.route('/products/:productId/files')
        .all(passport.authenticate('jwt', { session: false }))
        .get(filesController.list)
        .post(filesController.upload)

    app.route('/products/:productId/files/:fileId')
        .all(passport.authenticate('jwt', { session: false }))
        .get(filesController.download)
        .delete(filesController.remove)
}