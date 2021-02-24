const express = require('express');
const cors = require('cors');

const Article = require('../models/article');
const { verifyToken } = require('../middlewares/authentication');

const app = express();
const corsOptions = {
    origin: 'http://localhost:4206',
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.post('/article',cors(), verifyToken, (req, res) => {

    let body = req.body;

    let article = new Article({
        artName: body.artName,
        artContent: body.artContent,
        artAut: req.user._id, //token:{{token}} // token required
        imag: body.imag
    });

    article.save( (err, articleSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            art: articleSave
        });
    });
});


module.exports = app;
