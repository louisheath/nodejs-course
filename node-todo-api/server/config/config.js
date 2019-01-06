const env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';

} else if (env === 'production') {
  process.env.MONGODB_URI = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds149754.mlab.com:49754/todo-app`;

} else {
  console.log('env not recognised');
}
