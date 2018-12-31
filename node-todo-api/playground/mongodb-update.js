const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) 
    return console.log('Unable to connect to MongoDB server');
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: ObjectID("5c29347a076d2dae7812d68d")
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then(console.log);

  db.collection('Users').findOneAndUpdate({
    _id: ObjectID("5c2935447ff75caea9ce5725")
  }, {
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then(console.log);

  console.log('closing db');
  db.close();
});

