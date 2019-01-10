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
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};