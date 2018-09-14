const express = require('express');

const bookRoutes = express.Router();

const routes = (navBar) => {
  const books = [
    {
      title: 'Harry Potter and the Philosopher Stone',
      author: 'J K Rowling',
      id: 0,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      id: 1,
    },
  ];

  bookRoutes.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        navBar,
        books,
        title: 'Books',
      });
    });

  bookRoutes.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const book = books.find(b => b.id === parseInt(id, 10));

      res.render('bookView', {
        navBar,
        book,
      });
    });

  return bookRoutes;
};

module.exports = routes;
