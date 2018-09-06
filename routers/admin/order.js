//引入express
var express = require('express');

var router = express.Router();
var order = require('../../models/order');
var orderdetail = require('../../models/orderdetail');
var goods = require('../../models/goods')

router.get('/', function(req, res, next) {
	order.find({}).then(function(resData) {
		orders = resData;
		res.render('admin/x_order_index', {
			userInfo1: req.userInfo1,
			show : 'true',
			order : orders
		});

	});
	return;
});


router.get('/look/orderdetail', function(req, res, next) {
	oid = req.query.oid;
	orderdetail.find({
		oid : oid
	}).then(function(resData) {
		orderdetails = resData;
		return res.render('admin/x_order_detail' , {
			userInfo1: req.userInfo1,
			show : 'true',
			orderdetails: orderdetails
		});
	});
})

// router.get('/insert', function(req, res, next) {
// 	// new order({
// 	//     "subnum" : "201710291448333679924835",
// 	//     "uid" : "5a1b7aabbfa04c25d08fbc56",
// 	//     "sendAdd" : "广东省广州市天河东圃宦西溪路",
// 	//     "spDate" : "2017年10月29日14时48分33秒",
// 	//     "spPrice" : 18,
// 	//     "sendDate" : "待定",
// 	//     "spphone" : "13802816743",
// 	//     "spname" : "admin",
// 	//     "spStatus" : 0,
// 	// }).save();
// 	var oid = '';
// 	order.find({}).then(function(res) {
// 		oid = res[9]._id;
// 		// console.log(oid)
// 		new orderdetail({
// 		    "gid" : "5a1b7a08f1020a1b6cd14db7",
// 		    "oid" : oid,
// 		    "name" : "\n\t\t\t\t\t\t\t大号鼠标垫键盘垫600*300mm\n\t\t\t\t\t\t",
// 		    "count" : 2,
// 		    "price" : 18,
// 		    "color" : "蓝色"
// 		}).save().then(function(e) {
// 			// console.log(e)
// 		})
// 	})
	
// 	next()
// })

//删除用户操作
var userData;//设定返回的对象
router.use(function(req, res, next){
	userData = {
		code: '',
		message: '',
		username:''
	}
	next();
	
});
router.post('/orderDel', function (req, res, next) {
	var oid = req.body.oid;
    order.findOne({
    	_id : oid
    }).then(function(result){
    	if(result){
    		result.remove( function (err,rut){
    			if(err){
    				userData.code = '1';
    				userData.message = '删除数据失败';
    				res.json(userData);
    				return;
    			}else{
    				userData.code = '200';
    				userData.message = '删除数据成功';
    				res.json(userData);
    				return;
    			}
    		});
    	}else{
    		userData.code = '404';
			userData.message = '你要删除的订单不存在';
			res.json(userData);
			return;
    	}
    });
    orderdetail.remove({
    	oid : oid
    }).then(function(res){
    	if(res) {
//  		console.log('成功!');

    		return;
    	}
    })
	    
});

//修改账户操作
// var responses = '';
// router.post('/orderupdates',function(req, res, next){
// 	var orderid = req.body.orderid;
// 	order.findOne({
// 		_id : orderid
// 	}).then(function(resD) {
// 		if(resD) {
// 			responses = resD;
// 			// console.log(resD)
// 			res.json(responses)
// 		}
// 	})
// });

// 修改订单
router.get('/orderupdate', function(req, res, next) {
	order.findOne({
		_id : req.query._id
	}).then(function(r) {
		var result = r;
		return res.render('admin/order_xiu.html', {
			userInfo1: req.userInfo1,
			show : 'true',
			response : result
		});
	})
})

router.post('/updatedetail',function(req, res, next){
	var upsid = req.body.id;
	var upsadd = req.body.ad;
	var upsphone = req.body.ph;
	var upsname = req.body.name;
	order.update({
		_id : upsid
	},{
		$set: {
			sendAdd : upsadd,
			spphone : upsphone,
			spname : upsname
		}
	}).then(function(resul) {
		if(resul !== 'undefined') {
//			console.log('haha')
			res.render('admin/success' ,{
				userInfo1: req.userInfo1,
				message : '修改成功',
				show: 'true',
				url: '/order'
			});
			return;
		}else{
			res.render('admin/error',{
				userInfo1: req.userInfo1,
				message:'修改失败',
				show: 'true'
			});
			return;
			
		}
		
	})
});


// 订单详情修改和删除
router.get('/orderdetailupdate', function(req, res, next) {
	var gid = req.query.gid;
	orderdetail.find({
		_id : gid
	}).then(function(ress){
		var result = ress;
		res.render('admin/orderdetail_xiu.html', {
			userInfo1: req.userInfo1,
			show : 'true',
			odetail : result[0]
		});
		return;
	})
});

router.post('/orderdetailupdate',function(req, res, next){
	// console.log(req.body)
	var upcount = req.body.count;
	var upid = req.body.id;
	var upcolor = req.body.color;
	var upoid = req.body.oid;
	var upprice = req.body.price;
	var spprice = '';
	var oldcount = '';
	// 订单详情
	orderdetail.findOne({
		_id : upid
	}).then(function(recount) {
		// 原来数量
		oldcount = recount.count;
	});
	// 订单页
	order.findOne({
		_id : upoid
	}).then(function(reprice) {
		// 原来总价
		spprice = reprice.spPrice;
	})

	if(upcount >= 1) {
		orderdetail.update({
			_id : upid
		},{
			$set: {
				// 修改后的数量
				count : upcount,
				color : upcolor
			}
		}).then(function(resuls) {
			if(upcount == oldcount) {
				res.render('admin/success' ,{
					userInfo1: req.userInfo1,
					message : '修改成功',
					show: 'true',
					url: '/order'
				});
				return;
			}else{
				var sumcount1 = upcount - oldcount;
				if(resuls !== 'undefined') {
					order.update({
						_id : upoid
					},{
						$set: {
							// 增加金额
							spPrice : spprice + (sumcount1 * upprice)
						}
					}).then(function(repd) {
						if(repd !== 'undefined') {
							res.render('admin/success' ,{
								userInfo1: req.userInfo1,
								message : '修改成功',
								show: 'true',
								url: '/order'
							});
							return;
						}else{
							res.render('admin/error',{
								userInfo1: req.userInfo1,
								message:'修改失败',
								show: 'true'
							});
							return;
							
						}
					})
					
				}else{
					res.render('admin/error',{
						userInfo1: req.userInfo1,
						message:'修改失败',
						show: 'true'
					});
					return;
					
				}
			}
			
		})
	}else{
		res.render('admin/error',{
			userInfo1: req.userInfo1,
			message:'修改失败',
			show: 'true'
		});
		return;
	}
});





module.exports = router;