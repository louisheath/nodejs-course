const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

  describe('#add', () => {

    it('should add two numbers', () => {
      expect(utils.add(33,11)).toBe(44);
      expect(utils.add(12,-1)).toBe(11);
      expect(utils.add(1,0)).toBe(1);
    });
  
    it('should async add two numbers', (done) => {
      utils.asyncAdd(3, 4, sum => {
        expect(sum).toBeA('number').toBe(7);
        done();
      });
    });

  });
  
  describe('#square', () => {

    it('should square a number', () => {
      expect(utils.square(5)).toBe(25);
      expect(utils.square(5)).toBe(25);
      expect(utils.square(1)).toBe(1);
      expect(utils.square(0)).toBe(0);
      expect(utils.square(-1)).toBe(1);
    });

    it('should async square a number', (done) => {
      utils.asyncSquare(2, square => {
        expect(square).toBeA('number').toBe(4);
        done();
      });
    });

  });
  
  it('should pass more tests', () => {
    expect({name: 'John'})
      .toNotBe({name: 'John'})
      .toEqual({name: 'John'});
  
    expect([1,2,3,4,5])
      .toInclude(3)
      .toExclude(6);
  
    expect({
      name: 'Louis',
      age: 20,
      location: 'London'
    }).toInclude({
      age: 20
    }).toExclude({
      pet: 'Bobby'
    })
  });
  
  it('should set name of user', () => {
    let user = {age: 4};
    expect(utils.setName(user, 'Bobby Heath'))
      .toBeA('object')
      .toInclude({firstName: 'Bobby', lastName: 'Heath'});
  });

});

