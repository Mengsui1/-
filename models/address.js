var mongoose = require('mongoose');
var userSchema = require('../schemas/address');

module.exports = mongoose.model('address', userSchema);