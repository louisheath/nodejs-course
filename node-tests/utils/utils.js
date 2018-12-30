const add = (a, b) => a + b;
const square = x => x * x;
const setName = (user, fullName) => {
  let names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};

const asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 100);
};
const asyncSquare = (x, callback) => {
  setTimeout(() => {
    callback(x * x);
  }, 100);
}

module.exports = {
  add,
  square,
  setName,
  asyncAdd,
  asyncSquare
};