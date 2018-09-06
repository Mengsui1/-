//商品详情表结构
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	index:{
		type:String,
		default:''
	},
	indexImg:{
		type:String,
		default:''
	},
	xl:{
		type:String,
		default:''
	},
	title : String,//标题
	descript : String,//描述
	shop : String,//卖家
	nums : String,//总数
	price : String,//价格
	color : Array,//颜色
	storage:{
		type:Array,
		default:['新货32GB','厂家指导价128GB']
	},//内存容量
	taozhuang : {
		type: String,
		default: '官方标配'
	},//套装
	peijian : String,//配件
	mainpic : Array,//详情图组s
	date : String,
	brand : String,//品牌
	goodStatus : String,//是否上架
	tid : String//商品类别
});