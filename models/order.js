var mongoose = require('mongoose');

var userSchema = require('../schemas/order');

module.exports = mongoose.model('order', userSchema);