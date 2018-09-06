var mongoose = require('mongoose');

var userSchema = require('../schemas/Category');

module.exports = mongoose.model('Category', userSchema);