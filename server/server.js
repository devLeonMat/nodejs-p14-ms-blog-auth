
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');

require('./config/config');

mongoose.connect(process.env.KDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('ONLINE Database'.gray)
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use (bodyParser.json());

app.use( require('./routes/index') );

app.listen(process.env.PORT, () => {
    console.log('Listening!'.blue, process.env.PORT);
});
