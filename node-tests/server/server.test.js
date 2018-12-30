const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;

describe('Server', () => {

  it('should return hello world response', done => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello World')
      .end(done);
  });
  
  it('should create object', done => {
    request(app)
      .get('/object')
      .expect(201)
      .expect({
        head: 'foo',
        body: 'bar'
      })
      .expect(res => {
        expect(res.body).toInclude({
          head: 'foo'
        });
      })
      .end(done);
  });
  
  it('should return list of users', done => {
    request(app)
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(res.body).toInclude({
          name: 'Louis',
          age: 20
        });
      })
      .end(done);
  });

});

