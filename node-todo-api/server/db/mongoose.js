const mongoose = require('mongoose');

const localURI = 'mongodb://localhost:27017/TodoApp';
const mlabURI = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds149754.mlab.com:49754/todo-app`;

mongoose.Promise = global.Promise;
mongoose.connect(mlabURI);

module.exports = {mongoose};