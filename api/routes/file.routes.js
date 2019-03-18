'use strict'

module.exports = (app) => {
    const fileController = require('../controllers/file.controller')

    app.use(require('connect-busboy')())

    app.route('/files')
        .get(fileController.list)
        .post(fileController.upload)

    app.route('/files/:fileId')
        .get(fileController.download)
}