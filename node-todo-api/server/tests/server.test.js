const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Todo} = require('./../models/todo');
const {app} = require('./../server');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: true,
  completedAt: new Date().getTime()
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('/POST todos', () => {

  it('should save a todo', (done) => {
    const text = 'it should be a new todo';

    request(app)
      .post('/todos')
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
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });

});

describe('GET /todos/:id', () => {

  it('should get a specific todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .get(`/todos/${strId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
      })
      .end(done);
  });

  it('should return 400 if object id not valid', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(400)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    const strId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${strId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(strId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          return Todo.findById(strId);
        }).then((todo) => {
          expect(todo).toNotExist();
          done();
        })
        .catch(e => done(e));
      });
  });

  it('should return 400 if object id not valid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(400)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
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
      .expect(400)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .patch(`/todos/${new ObjectID()}`)
      .send({})
      .expect(404)
      .end(done);
  });

});