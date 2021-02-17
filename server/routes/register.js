const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// const {verifyToken} = require('../middlewares/authentication');

app.post('/user', function(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });

    user.save( (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    });
});

module.exports = app;
