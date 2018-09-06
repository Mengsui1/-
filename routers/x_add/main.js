//引入express
var express = require('express');

var router = express.Router();

var User = require('../../models/S_userss');
var Good = require('../../models/goods');
var Order = require('../../models/order');//订单表
var Orderdatail = require('../../models/orderdetail');//订单表商品表
//创建路由访问规则
router.get('/', function (req, res, next) {
    //渲染
    res.render('main/S_pagehome', {
    });
});
var data = '';
//买家中心
router.get('/buyhome', function (req, res, next) {
if(req.userInfo){
    var eGoods = [];
	Good.find({tid:'1'}).then(function(Good){

        for(var i = 0; i < 4; i++){
            eGoods.push(Good[i]);
        }
        User.find({}).then(function (userinfo){
            if(userinfo){
                data = userinfo;
                
                 //渲染买家中心
    		    res.render('main/S_buyhome', {
    		    	title:req.userInfo,
    		    	data:data,
                    eGoods:eGoods,
    		    });
            }

        })
    });

}else{
	res.render('login/W_login',{});
}
    
});
//收货地址管理
router.get('/add', function (req, res, next) {
    //渲染
    res.render('main/S_add', {
    	title:req.userInfo,
    });
});

router.post('/ajax_order',function(req,res,next){

	var obj_order = {};
	Order.find({uid:req.userInfo.id}).then(function(result){//找到用户有多少个订单
//		console.log(result)

//			for(var i = 0; i < result.length; i++){
//				Orderdatail.find({oid:result[i].id}).then(function(Good){
//
//				})
//			}

			

	})
})


//引入到核心模块
module.exports = router;