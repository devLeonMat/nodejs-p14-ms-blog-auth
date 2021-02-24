const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const User = require('../models/user');

const app = express();
const corsOptions = {
    origin: 'http://localhost:4206',
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

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
