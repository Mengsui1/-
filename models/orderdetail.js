var mongoose = require('mongoose');

var userSchema = require('../schemas/orderdetail');

module.exports = mongoose.model('orderdetail', userSchema);