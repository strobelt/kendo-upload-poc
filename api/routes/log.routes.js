'use strict'

module.exports = (app, middlewares) => {
    const logController = require('../controllers/log.controller')

    app.route('/logs')
        .get([middlewares], logController.list_all_logs)
}