var mongoose = require('mongoose');
var userSchema = require('../schemas/discuss');

module.exports = mongoose.model('discuss', userSchema);