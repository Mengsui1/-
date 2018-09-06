/**
 * Created by neo老师 on 2017/8/17
 * 兄弟连IT教育
 */

var mongoose = require('mongoose');

var userSchema = require('../schemas/users');

module.exports = mongoose.model('User',userSchema);
