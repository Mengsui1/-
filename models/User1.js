//前台用户表
var mongoose = require('mongoose');

var userSchema = require('../schemas/user1');

module.exports = mongoose.model('User1', userSchema);