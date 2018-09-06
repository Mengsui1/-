var mongoose = require('mongoose');
var userSchema = require('../schemas/L_users');
module.exports = mongoose.model('User2',userSchema);