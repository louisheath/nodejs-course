const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo' );
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo(req.body);
  todo.save().then(console.log);

  res.status(200).send();
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
 