'use strict'

module.exports = (app) => {
    const userController = require('../controllers/user.controller')

    app.route('/login')
        .post(userController.login)

    app.route('/register')
        .post(userController.register)
}