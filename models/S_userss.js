var mongoose = require('mongoose');

var userSchema = require('../schemas/S_user.js');

module.exports = mongoose.model('address',userSchema);