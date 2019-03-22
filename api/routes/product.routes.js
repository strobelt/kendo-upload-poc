'use strict'

module.exports = (app, middlewares) => {
    const productController = require('../controllers/product.controller')
    const filesController = require('../controllers/file.controller')

    app.route('/products')
        .get([middlewares], productController.list_all_products)
        .post([middlewares], productController.create_product)

    app.route('/products/:productId')
        .get([middlewares], productController.read_product)
        .put([middlewares], productController.update_product)
        .delete([middlewares], productController.delete_product)

    app.route('/products/:productId/files')
        .get([middlewares], filesController.list)
        .post([middlewares], filesController.upload)

    app.route('/products/:productId/files/:fileId')
        .get([middlewares], filesController.download)
        .delete([middlewares], filesController.remove)
}