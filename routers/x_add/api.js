var express = require('express');

var router = express.Router();

var User = require('../../models/S_userss');//model


// 处理地址
router.post('/addappend', function (req, res, next) {
//	console.log(req.body)
    var username = req.body.name;
	var city= req.body.sheng;
	var add= req.body.dizhi;
	var postcode= req.body.postdz;
	var tel= req.body.shouji;
	var email=req.body.email;
	var moren = req.body.moren;
	var id = req.userInfo._id.toString();
	// console.log(id)
	if(moren == '是') {
		User.update(
			{ moren : '是' }, 
			{ $set : { moren : '否' } }, 
			{ multi : true}).then(function(resup) {
				if(resup) {
					// 得到数据
					user = new User({
						uId:id,
						username : username,
						city: city,
						add: add,
						postcode: postcode,
						tel: tel,
						email:email,
						moren : moren
					}).save().then(function(resData) {
						if(resData) {
							res.json('保存成功!');
							return;
						}else{
							return;
						}
					})
				}
			})
	}else{
		// 得到数据
		user = new User({
			uId:id,
			username : username,
			city: city,
			add: add,
			postcode: postcode,
			tel: tel,
			email:email,
			moren : moren
		}).save().then(function(resData) {
			if(resData) {
				res.json('保存成功!');
				return;
			}else{
				return;
			}
		})
	}
	

});

// 前台添加地址


router.get('/addappenda', function(req, res, next) {
if(req.userInfo){
    //找到了此类商品
    var page = Number(req.query.page || 1);
    var limit = 3;
    var pages = 0;
    var resNum = '';
    User.find({}).then(function(result) {
    	//数据的个数
   		resNum = result.length;
	    //计算总页数
	    pages = Math.ceil(resNum / limit);
	    page = Math.min(page, pages);
	    page = Math.max(page, 1);

	    //设定每页跳过的数据
	    var skip = (page - 1) * limit;
	    User.find({}).limit(limit).skip(skip).then((Good) => {
	        return res.render('main/S_buyhome.html', {
	        	title:req.userInfo,
	            data: Good,
	            count: resNum,
	            pages: pages,
	            limit: limit,
	            page: page,
	            arg: '/user2/addappenda',
	            show : 'true'
	        });
	    });
    });
}else{
	render('login/W_login',{})
}
})

var delorder;//设定返回的对象
router.use(function(req, res, next){
	delorder = {
		code: '',
		message: '',
	}
	next();
	
});

// 删除订单
router.post('/delOrder', function(req, res, next) {

if(req.userInfo){
	var oid = req.body.oid;
	User.findOne({
		_id : oid
	}).then(function(resinfo) {
		if(resinfo) {
			resinfo.remove(function(err, rul) {
				if(err) {
					delorder.code = '1';
    				delorder.message = '删除数据失败';
					res.json(delorder);
					return;
				}else{
					delorder.code = '200';
    				delorder.message = '删除数据成功';
					res.json(delorder);
					return;
				}
			})
		}else{
			delorder.code = '404';
			delorder.message = '你要删除的订单不存在';
			res.json(delorder);
			return;
		}
	})
}else{
	render('login/W_login',{})
}
})


module.exports = router;