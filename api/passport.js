'use strict'
const passport = require('passport'),
    passportJWT = require('passport-jwt'),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    secret = require('./config').secret

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async function (username, password, next) {
    const user = await User.findOne({ username })
    if (user && await bcrypt.compare(password, user.password)) {
        user.password = undefined
        return next(null, user)
    }
    else
        return next(null, false)
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, function (jwtPayload, next) {
    User.findById(jwtPayload._id, function (err, user) {
        if (err) return next(err)
        return next(null, user)
    })
}))