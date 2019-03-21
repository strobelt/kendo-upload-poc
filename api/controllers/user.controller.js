'use strict'

const jwt = require('jsonwebtoken'),
    passport = require('passport'),
    secret = require('../config').secret,
    bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    User = mongoose.model('User')

const saltRounds = 10

exports.login = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).send();
        }

        req.login(user, { session: false }, (err) => {
            if (err) return res.send(err)
            const token = jwt.sign(user.toJSON(), secret)
            return res.json({ user, token })
        })
    })(req, res)
}

exports.register = async (req, res) => {
    const username = req.body.username,
        password = req.body.password

    const existingUser = await User.findOne({ username })
    if (existingUser)
        return res.status(409).json({
            message: 'User already exists'
        })

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = new User({ username, password: hashedPassword })
    newUser.save()
    return res.json({
        message: 'Registration successful'
    })
}
