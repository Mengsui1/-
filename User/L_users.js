var mongoose = require('mongoose');

// 建立表结构
module.exports = new mongoose.Schema({
	userId:String,//这个id是cookie里面取出来的
	username: { type: String, default: 'lisi' },//用户名
	sex: { type: String, default: '女' },//性别
	Birthday: { type: String, default: '1996-12-24' },//生日
	region: { type: String, default: '广东' },//地域
	Photo: { type: String, default: '' },//头像	
	Marriage: { type: String, default: '未婚' },//婚姻
})