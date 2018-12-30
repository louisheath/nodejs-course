const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) 
    return console.log('Unable to connect to MongoDB server');
  console.log('Connected to MongoDB server');

  const todos = db.collection('Todos');

  // deleteMany
  todos.deleteMany({text: 'Take down Christmas tree'}).then(r => {
    console.log(`deleteMany deleted ${r.result.n} documents`)
  });

  // deleteOne
  todos.deleteOne({text: 'Take down Christmas tree'}).then(r => {
    console.log(`deleteOne deleted ${r.result.n} documents`)
  });

  // findOneAndDelete
  todos.findOneAndDelete({completed: false}).then(r => {
    if (r.lastErrorObject.n === 1)
      console.log(`findOneAndDelete deleted "${r.value.text}"`);
    else
      console.log('findOneAndDelete deleted 0 documents');
  });

  db.close();
});

