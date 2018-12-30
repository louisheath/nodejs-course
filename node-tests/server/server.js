const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/object', (req, res) => {
  res.status(201).send({
    head: 'foo',
    body: 'bar'
  });
});

app.get('/users', (req, res) => {
  const users = [
    { name: 'Louis',
      age: 20 }, 
    { name: 'Barry',
      age: 16 },
    { name: 'Bobby',
      age: 4 }
  ];
  res.send(users);
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});

module.exports.app = app;