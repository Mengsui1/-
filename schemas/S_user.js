var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	uid : String,//用户id
    username : String,//用户名
	city: String,//省份
	add: String,//详细地址
	postcode: String,//邮政编码
	tel: String,//手机号码
	email:String,//电子邮箱
	moren: String//是否默认地址
});
