const mongoose = require('mongoose'),
    Log = mongoose.model('Log')

module.exports = function () {
    return async function (req, res, next) {
        const logEntry = new Log({
            method: req.method,
            url: req.url,
            params: JSON.stringify(req.params),
            body: JSON.stringify(req.body),
            userId: req.user._id,
            username: req.user.username
        })
        await logEntry.save()
        next()
    }
}