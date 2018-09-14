const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const navBar = [
  { title: 'Books', link: '/books' },
  { title: 'Authors', link: '/authors' },
];

const bookRoutes = require('./src/routes/bookRoutes')(navBar);

app.use('/books', bookRoutes);
app.get('/', (req, res) => {
  res.render('index', {
    navBar,
    title: 'Library',
    blocks: [],
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
