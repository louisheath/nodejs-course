const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   res.render('maintenance', {
//     paragraph:'sorry, the site is down'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', str => {
  return str.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    header: 'Hello Express!',
    paragraph: 'Skadoosh'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    header: 'roundAbout',
    paragraph: 'It was me Dio!'
  });
});

app.get('/bad', (req, res) => {
  res.send('<h1>you been a bad boy</h1>');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});