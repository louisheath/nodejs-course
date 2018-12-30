const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) 
    return console.log('Unable to connect to MongoDB server');
  console.log('Connected to MongoDB server');

  const todos = db.collection('Todos');

  todos.insertOne({
    text: 'Take down Christmas tree',
    done: false
  }, (error, result) => {
    if (error)
      return console.log('Failed to insert todo', err);
    console.log('Inserted:');
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  todos.find({
    _id: new ObjectID('5c29347a076d2dae7812d68d')
  }).toArray().then((docs) => {
    console.log('Found:');
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch(console.log);

  todos.find().count().then((count) => {
    console.log('Todos count:', count);
  }).catch(console.log);


  console.log('closing db');
  db.close();
});

