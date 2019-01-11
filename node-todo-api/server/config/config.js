const env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
  process.env.JWT_SECRET = 'asdf';

} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
  process.env.JWT_SECRET = 'asdf';

} else if (env === 'production') {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET)
    console.log('ERROR: missing heroku environment variables');

} else {
  console.log('env not recognised');
}
