const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Incorrect (user) or password'
                }
            });
        }
        if ( !bcrypt.compareSync( body.password, userDB.password )) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Incorrect user or (password)'
                }
            });
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.EXP_TOKEN });

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
});

module.exports = app;
