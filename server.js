const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('./config/database');

app.disable('x-powered-by');
app.set('secretKey', '#!%!#%@#^!@$!#%~@');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({"Name": "CBP_server"});
});

app.use('/auth', require('./api/route/auth'));

app.listen(3000, () => {
    console.log('Server listening on Port 3000');
});

const validateUser = (req, res ,next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
        if(err) res.status(401).json({status: 'error', message: err.message, data: null});
        else {
            req.body.uid = decoded.id;
            next();
        }
    });
};