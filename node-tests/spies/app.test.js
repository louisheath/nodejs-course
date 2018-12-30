const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {

  let db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    const spy = expect.createSpy();
    spy('Louis', 20);
    expect(spy).toHaveBeenCalledWith('Louis', 20);
  });

  it('should call saveUser with user object', () => {
    const email = 'abc@gmail.com';
    const password = 'password';
    app.signUp(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });

});