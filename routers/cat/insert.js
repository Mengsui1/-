var express = require('express');
var router = express.Router();
var address = require('../../models/S_userss');
var user = require('../../models/User');
var order = require('../../models/order')

router.get('/', function(req, res, next) {
	// var orders;
	// user.find({}).then(function(res) {
	// 	uid = res[0].id;
	// })
	// add.find({}).then(function(res) {
	// 	adds = res[0].address;

	// var time = new Date();
	// var y = time.getFullYear();
	// var m = time.getMonth();
	// var d = time.getDate();
	// var h = time.getHours();
	// var Mm = time.getMinutes();
	// var s = time.getSeconds();
	// var subnum = y + "" + m+ "" +d+ ""+h+ ""+Mm+ ""+s+ "" + parseInt(Math.random()*10000000001);
	// var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒'
	// var sendTime = y + '年'+ m + '月' + (d+2) + '日' + h + '时' + Mm + '分' + s + '秒'
	// console.log(adds)
	new address({
		"username" : "乌龟王八蛋",
	    "city" : "广东-广州",
	    "add" : "广东省广州市天河东圃康乐新村",
	    "postcode" : "123321",
	    "tel" : "13434333444",
	    "email" : "1231223123@qq.com",
	    "moren" : "否",
		
	}).save().then(function(resData) {
		// console.log(resData)
		if(resData) {
			res.send('"插入成功"');
			return;
		}
		
	})
// })
	
	
})

module.exports = router;



