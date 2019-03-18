'use strict'

module.exports = (app) => {
    const productController = require('../controllers/product.controller')
    const filesController = require('../controllers/file.controller')

    // product routes
    app.route('/products')
        .get(productController.list_all_products)
        .post(productController.create_product)

    app.route('/products/:productId')
        .get(productController.read_product)
        .put(productController.update_product)
        .delete(productController.delete_product)

    app.route('/products/:productId/files')
        .get(filesController.list)
        .post(filesController.upload)

    app.route('/products/:productId/files/:fileId')
        .get(filesController.download)
}