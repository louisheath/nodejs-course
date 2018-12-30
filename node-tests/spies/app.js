const db = require('./db');

module.exports.signUp = (email, password) => {
  // check if email exists

  // save user to db
  db.saveUser({
    email,
    password
  });

  // send welcome email
  
};