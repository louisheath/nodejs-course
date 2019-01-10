const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userIds = [
  new ObjectID(),
  new ObjectID()
];

const users = [{
  _id: userIds[0],
  email: 'one@example.com',
  password: 'password1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userIds[0].toHexString()}, 'abc123').toString()
  }]
}, {
  _id: userIds[1],
  email: 'two@example.com',
  password: 'password2',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userIds[1].toHexString()}, 'abc123').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: true,
  completedAt: new Date().getTime(),
  _creator: userIds[0]
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  _creator: userIds[1]
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};