require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo' );
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  }).catch((e) => {
    res.status(500).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.status(200).send({todos});
  }).catch(e => {
    res.status(500).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(500).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(500).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  const body = _.pick(req.body, ['text', 'completed']);

  if (body.completed === true) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }
  ).catch((e) => {
    return res.status(500).send();
  });

});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
 