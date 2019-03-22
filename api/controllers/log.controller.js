'use strict'

const mongoose = require('mongoose'),
    Log = mongoose.model('Log')

exports.list_all_logs = (_req, res) =>
    Log.find()
        .sort([['date', -1]])
        .exec((err, logs) => {
            if (err)
                res.send(err)
            res.json(logs)
        })