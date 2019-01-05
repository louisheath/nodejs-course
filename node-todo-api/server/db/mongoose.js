const mongoose = require('mongoose');

const {mlab} = require('./../../keys');

const local = 'mongodb://localhost:27017/TodoApp';
const mlab = `mongodb://${mlab.username}:${mlab.password}@ds149754.mlab.com:49754/todo-app`;

mongoose.Promise = global.Promise;
mongoose.connect(mlab);

module.exports = {mongoose};