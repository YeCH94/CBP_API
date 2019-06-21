const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: (req, res, next) => {
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, (err, result) => {
            if(err) next(err);
            else res.json({status: 'success', message: 'join success', data: null});
        });
    },
    authenticate: (req, res, next) => {
        userModel.findOne({email: req.body.email}, (err, result) => {
            if(err) next(err);
            else {
                if(bcrypt.compareSync(req.body.password, result.password)) {
                    const token = jwt.sign({id: result._id}, req.app.get('secretKey'), {expiresIn: '30d'});
                    res.json({status: 'success', message: 'user found', data: {user: result, token: token}});
                } else {
                    res.json({status: 'error', message: 'user not found', data: null});
                }
            }
        });
    }
};