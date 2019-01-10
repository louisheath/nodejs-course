const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {app} = require('./../server');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('/POST todos', () => {

  it('should save a todo', (done) => {
    const text = 'it should be a new todo';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not save bad todo', (done) => {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch(e => done(e));
      });
  });

});

describe('GET /todos', () => {

  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });

});

describe('GET /todos/:id', () => {

  it('should return owned todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${strId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
      })
      .end(done);
  });

  it('should not return unowned todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${strId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should get a specific todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${strId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
      })
      .end(done);
  });

  it('should return 400 if object id not valid', (done) => {
    request(app)
      .get(`/todos/123`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {

  it('should remove an owned todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${strId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(strId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('should not remove an unowned todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${strId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(strId).then((todo) => {
          expect(todo).toExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 400 if object id not valid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should update todo text', (done) => {
    const text = 'Updated text';
    const strId = todos[0]._id.toHexString();

    request(app)
      .patch(`/todos/${strId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
        expect(res.body.todo.text).toBe(todos[0].text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should complete a todo', (done) => {
    const strId = todos[1]._id.toHexString();
    
    request(app)
      .patch(`/todos/${strId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
        expect(res.body.todo.text).toBe(todos[1].text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should in-complete todo', (done) => {
    const text = 'Updated text';
    const strId = todos[0]._id.toHexString();

    request(app)
      .patch(`/todos/${strId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
        expect(res.body.todo.text).toBe(todos[0].text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  })

  it('should return 400 if object id not valid', (done) => {
    request(app)
      .patch(`/todos/123`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .patch(`/todos/${new ObjectID()}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(404)
      .end(done);
  });

});

describe('GET /users/me', () => {

  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', 'fail')
      .expect(401)
      .end(done);
  });

});

describe('POST /users', () => {

  it('should create a user', (done) => {
    const email = 'new@example.com';
    const password = 'password';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(done);
  });

  it('should validate email format', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'notanemail',
        password: 'password'
      })
      .expect(400)
      .end(done);
  });

  it('should validate password length', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'new@example.com',
        password: 'passw'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'password'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {

  it('should log in user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.header['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            token: res.header['x-auth']
          });
          done();
        }).catch(done);
      });
  });

  it('should reject invalid email', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: 'notin@thedatabase.com',
        password: 'password'
      })
      .expect(400)
      .expect((res) => {
        expect(res.header['x-auth']).toNotExist();
      })
      .end(done);
  });

  it('should reject invalid password', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[0].email,
        password: 'wrongpassword'
      })
      .expect(401)
      .expect((res) => {
        expect(res.header['x-auth']).toNotExist();
      })
      .end(done);
  });

});

describe('DELETE /users/me/token', () => {

  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        });
      });
  });

});