const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
  text: {
    type: 'string',
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: 'Boolean',
    default: false
  },
  completedAt: {
    type: 'number',
    default: null
  }
});

module.exports = {Todo};