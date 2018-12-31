const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: 'string',
    required: true,
    minLength: 1,
    trim: true
  }
});

module.exports = {User};