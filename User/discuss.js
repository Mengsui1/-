var mongoose = require('mongoose');

// 表结构
module.exports = new mongoose.Schema({
	oid : String,
	uid : String,
	content : String,
	comTime : {
		type : Date,
		default : Date.now()
	},
	compic : Array,
	status : String
})