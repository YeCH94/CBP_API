const mongoose = require('mongoose');
const path = 'mongodb://localhost:27017/cbp';

const connect = () => {
    mongoose.connect(path, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', err => {
        console.log('> Database connection failure', err);
    });

    mongoose.connection.once('open', () => {
        console.log('> Database connection success');
    })
};

connect();

module.exports = mongoose;
