var mongoose = require('mongoose');

// 表结构
module.exports = new mongoose.Schema({
	address : String,
	uid : String,
	phone : String,
	getman : String,
	status : String
})