
//引入express
var express = require('express');

var router = express.Router();
//用户帐号列表
var User = require('../../models/User');
var User1 = require('../../models/User1');

//引入商品详情模块
var Goods = require('../../models/Goods');

var userData;//设定返回的对象
router.use(function(req, res, next){
	userData = {
		code: '',
		message: '',
		username:''
	}
	next();
	
});

//定义返回前台的数据数组
var WSql;
var oSql;
router.use(function(req, res, next){
	WSql = {
		code:'',
		message:''
	};
	oSql = {
		
	};
	next();
});
//渲染后台首页
router.get('/',function(req, res, next) {
	
	if(req.userInfo1){
		res.render('admin/index', {
			userInfo1: req.userInfo1,
			show: ''
		});
	}else{
		res.render('admin/W_houtai', {
			
		});
	}
});
//前台用户列表
router.get('/users_money', function (req, res, next) {
    var limit = 5;//定义每页显示多少条数据
    var pages = 0;//定义总页数
    var page = Number(req.query.page || 1);

    //获取数据表中一共有多少条数据
    User1.count().then((count) => {
        //1.计算总页数
        pages = Math.ceil(count / limit);

        page = Math.min(page, pages);
        page = Math.max(page, 1);

        //2.跳过的条数
        var skip = (page - 1) * limit;

        User1.find().limit(limit).skip(skip).then((users) => {
			if(req.userInfo1){
				res.render('admin/user_money', {
	                userInfo1: req.userInfo1,
	                show: 'true',
	                limit: limit,
	                users: users,
	                pages: pages,
	                count: count,
	                page: page,//当前页
	                arg: 'user/users'
	
	            });
			}else{
				res.render('admin/W_houtai', {
					
				});
			}
	            
        });
    });
});

//前台用户删除帐号
router.post('/users_moneyDel',function(req, res, next){
	if(req.userInfo1.isAdmin == '3'){
		var W_user_id = req.body.W_user_id;
	    User1.findOne({
	    	_id: W_user_id
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
				userData.message = '你要删除的用户不存在';
				res.json(userData);
				return;
	    	}
	    });
	}else{
		userData.code = '300';
		userData.message = '删除失败，你所登录的账户管理级别不够，如有需要请联系超级管理员！！！！';
		res.json(userData);
		return;
		
	}
});

//前台用户修改处理
router.get('/users_moneyXiu',function(req,res,next){
	var id = req.query.id;
	User1.findOne({_id:id}).then(function(result){
		if(result){
			res.render('admin/user_moneyXiu',{
				userInfo1: req.userInfo1,
	            show: 'true',
				result:result
			})
			return;
		}else{
			res.render('admin/error',{
				userInfo1: req.userInfo1,
	            show: 'true',
				message:'没找到此账户！！！'
			})
			return;
		}
	})
	
});

router.post('/users_moneyXiu',function(req, res, next){
	var username = req.body.name;
	var password = req.body.password;
	var newpassword = req.body.newpassword;
	var userStatus1 = req.body.dis;
	var phone1 = req.body.phone;
	var id = req.body.id;
	var AddTime = new Date();
	var y = AddTime.getFullYear();
	var m = AddTime.getMonth();
	var d = AddTime.getDate();
	var h = AddTime.getHours();
	var Mm = AddTime.getMinutes();
	var s = AddTime.getSeconds();
	var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒'
	User1.findOne({_id:id}).then(function(result){
		if(result){		
			var userId = result.id;
			var userPass = result.password;
			//验证密码是否为空
			if(password == '' || newpassword == ''){
				password = userPass;
				newpassword = userPass;
			}else if(password != result.password){
				res.render('admin/error',{
					message:'输入的旧密码错误，无法通过验证',
					userInfo: req.userInfo,
					show:'true'
				});
				return;
			}
			
			User1.update({
				_id:userId
			},{$set:{password:newpassword,phone:phone1,userStatus:userStatus1,xiutime:addTime}}).then(function(rouder){
				if(rouder != 'undefined'){
					res.render('admin/success',{
						message:'修改成功',
						userInfo: req.userInfo,
						show:'true',
						url:'/user/users_money'
					})
					req.cookies.set('userInfo', null);
					
					return;
				}else{
					res.render('admin/error',{
						message:'输入的电话号码格式错误',
						userInfo: req.userInfo,
						show:'true'
					})
					return;
				}
			});
			
			
		}else{
			res.render('admin/error',{
				message:'此用户不存在',
				userInfo: req.userInfo
			})
			return;
		}
	});
});
//前台用户查询处理
router.get('/user_money_see',function(req, res, next){
	if(req.userInfo1){
		res.render('admin/userMoney_see',{
			userInfo1: req.userInfo1,
		    show: 'true',
		})
	}else{
		res.render('admin/W_houtai',{})
	}
});
router.post('/user_money_see',function(req, res, next){
	var name = req.body.name;
	name = new RegExp("^.*"+name+".*$");
	var W_select = req.body.W_select;
	oSql[W_select] = name;
	User1.find(oSql).then(function(result){
		if(res){
			res.json(result);
		}else{
			res.json('');
		}
		
	});
})


//后台用户列表

router.get('/users', function (req, res, next) {
    var limit = 5;//定义每页显示多少条数据
    var pages = 0;//定义总页数
    var page = Number(req.query.page || 1);

    //获取数据表中一共有多少条数据
    User.count().then((count) => {
        //1.计算总页数
        pages = Math.ceil(count / limit);

        page = Math.min(page, pages);
        page = Math.max(page, 1);

        //2.跳过的条数
        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then((users) => {
            // console.log(users);
			if(req.userInfo1){
				res.render('admin/user_index', {
	                userInfo1: req.userInfo1,
	                show: 'true',
	                limit: limit,
	                users: users,
	                pages: pages,
	                count: count,
	                page: page,//当前页
	                arg: 'user/users'
	
	            });
			}else{
				res.render('admin/W_houtai', {
					
				});
			}
	            
        });
    });
});

//删除用户操作
router.post('/userDel', function (req, res, next) {
	if(req.userInfo1.isAdmin == '3'){
		var W_user_id = req.body.W_user_id;
	    User.findOne({
	    	_id: W_user_id
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
				userData.message = '你要删除的用户不存在';
				res.json(userData);
				return;
	    	}
	    });
	}else{
		userData.code = '300';
		userData.message = '删除失败，你所登录的账户管理级别不够，如有需要请联系超级管理员！！！！';
		res.json(userData);
		return;
		
	}
	    
});

//添加用户操作
router.post('/userAdd',function(req, res, next){
	if(req.userInfo1.isAdmin == '3' || req.userInfo1.isAdmin == '2'){
		var Addusername = req.body.Addusername;
		var Addpassword = req.body.Addpassword;
		var Addregpassword = req.body.Addregpassword;
		var Addval = req.body.Addval;
		var AddTime = new Date();
	
		var y = AddTime.getFullYear();
		var m = AddTime.getMonth();
		var d = AddTime.getDate();
		var h = AddTime.getHours();
		var Mm = AddTime.getMinutes();
		var s = AddTime.getSeconds();
		var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒'
		var XiuTime = '';	
	
		if(Addusername == ''){
			userData.code = '0';
			userData.message = '用户名不能为空';
			res.json(userData);
			return;
		}
		
		if(Addpassword == ''){
			userData.code = '1';
			userData.message = '密码不能为空';
			res.json(userData);
			return;
		}
		
		User.findOne({
			username : Addusername
		}).then(function(result){
			if(result){
				userData.code = '3';
				userData.message = '用户名已经存在，请重新输入用户名';
				res.json(userData);
				return;
			}
			//保存用户数据
			var user = new User({
	            username: Addusername,//用户名
			    password: Addpassword,//密码
			    isAdmin : Addval,//数字2代表是否是管理员
			    AddTime: addTime,//注册的时间
			    xiuTime: XiuTime
	        });
	        return user.save();
		}).then(function(Addresult){
			if (Addresult != 'undefined') {
				userData.code = '4';
	            userData.message = addTime+'你的账户'+ Addusername +'注册成功!';
	            userData.username = Addresult.username;
	            res.json(userData);
	            return;
	        }
		});
	}else{
		userData.code = '300';
		userData.message = '添加失败，你所登录的账户管理级别不够，如有需要请联系超级管理员！！！！';
		res.json(userData);
		return;
	}
		
});

//修改账户操作
router.post('/userXiu',function(req, res, next){
	if(req.userInfo1.isAdmin == '3' || req.userInfo1.isAdmin == '2'){
		var Xiuusername = req.body.Xiuusername;
		var XiuIsAdd = req.body.XiuIsAdd;
		var Xiupassword = req.body.Xiupassword;
		var XiuNewpassword = req.body.XiuNewpassword;
		var AddTime = new Date();
		var y = AddTime.getFullYear();
		var m = AddTime.getMonth();
		var d = AddTime.getDate();
		var h = AddTime.getHours();
		var Mm = AddTime.getMinutes();
		var s = AddTime.getSeconds();
		var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒'
		if(Xiuusername == ''){
			userData.code = '0';
			userData.message = '用户名不能为空';
			res.json(userData);
			return;
		}
		
		if(Xiupassword == '' && XiuNewpassword == '’'){
			userData.code = '1';
			userData.message = '密码不能为空';
			res.json(userData);
			return;
		}
		//找数据
		User.findOne({
			username : Xiuusername
		}).then(function(result){
			if(!result){
				userData.code = '2';
				userData.message = '用户名不存在，请重新输入用户名....';
				res.json(userData);
				return Promise.reject();
			}else{
				if(result.password != Xiupassword){
					userData.code = '3';
					userData.message = '帐号与旧密码不匹配，请重新输入....';
					res.json(userData);
					return Promise.reject();
				}else{
					//用户名旧密码验证通过，可以修改
					if(result.password == XiuNewpassword){
						userData.code = '4';
						userData.message = '修改密码与旧密码重复，请换修改密码或不修改....';
						res.json(userData);
						return Promise.reject();
					}else{
						User.update({
							username:Xiuusername,password:Xiupassword
						},{
							$set:{password:XiuNewpassword,xiuTime:addTime,isAdmin:XiuIsAdd}
						}).then(function(resul){
							if(resul != 'undefined'){
								userData.code = '200';
								userData.message = '成功';
								userData.username = Xiuusername;
								res.json(userData);
								return Promise.reject();
							}else{
								userData.code = '4';
								userData.message = '修改失败';
								res.json(userData);
								return Promise.reject();
							}
						})
					}
				}
			}
		});
	}else{
		userData.code = '300';
		userData.message = '修改失败，你所登录的账户管理级别不够，如有需要请联系超级管理员！！！！';
		res.json(userData);
		return;
	}
		
});

//商品列表首页
router.get('/cotegory_index',function(req, res, next) {
	var num = req.query.num;

if(!num){
	var page = Number(req.query.page || 1);
    var limit = 5;
    var pages = 0;
    Goods.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);

        page = Math.min(page, pages);
        page = Math.max(page, 1);

        //设定每页跳过的数据
        var skip = (page - 1) * limit;

        //按规则查找
        Goods.find().limit(limit).skip(skip).then((Good) => {
			if(req.userInfo1){
				res.render('admin/cotegory_index', {
	                userInfo1: req.userInfo1,
	                show: 'true',
	                Good1: Good,
	                count: count,
	                pages: pages,
	                limit: limit,
	                page: page,
	                arg: 'user/cotegory_index'
	            });
			}else{
				
				res.render('admin/W_houtai', {
					
				});
			}
        });

    });
}else{
	if(req.userInfo1){
		Goods.find({
			tid:num
		}).then(function(result){
			if(result){
				//找到了此类商品
				var page = Number(req.query.page || 1);
			    var limit = 3;
			    var pages = 0;
			    //数据的个数
				var resNum = result.length;
			    
				//计算总页数
		        pages = Math.ceil(resNum / limit);
		
		        page = Math.min(page, pages);
		        page = Math.max(page, 1);
		
		        //设定每页跳过的数据
		        var skip = (page - 1) * limit;
				Goods.find({tid:num}).limit(limit).skip(skip).then((Good) => {
					res.render('admin/cotegory_index', {
		                userInfo1: req.userInfo1,
		                show: 'true',
		                Good1: Good,
		                count: resNum,
		                pages: pages,
		                limit: limit,
		                page: page,
		                num:num,
		                arg: 'user/cotegory_index'
		            });
		            return;
					
		        });
		        return;
			}else{
				res.render('admin/error',{
					message:'未找到此类商品',
					userInfo1: req.userInfo1,
					show: 'true'
					
				})
				return;
			}
		})
	}else{
		res.render('admin/W_houtai', {
					
		});
	}
	
}
	

});
//分类添加
router.get('/cotegory_add',function(req, res, next) {
	if(req.userInfo1){
		res.render('admin/cotegory_add.html', {
			userInfo1: req.userInfo1,
			show: 'true'
		});
	}else{
		res.render('admin/W_houtai', {
					
		});
	}
		
});

//添加商品处理
router.post('/cotegory_add', function(req, res, next) {
	var index = req.body.index;
	var xl = req.body.xl || '0';
	var indexImg = req.body.indexImg || '';
	var title = req.body.title;
	var descript = req.body.descript;
	var shop = req.body.shop;
	var nums = req.body.nums;
	var color = req.body.color;
	var price = req.body.price;
	var peijian = req.body.peijian;
	var mainpic = req.body.mainpic;
	var brand = req.body.brand;
	var goodStatus = req.body.goodStatus;
	var tid = req.body.tid;
	//标题不能空
	if(title == ''){
		res.render('admin/error',{
			message:'标题不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(descript == ''){
		res.render('admin/error',{
			message:'descript不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(shop == ''){
		res.render('admin/error',{
			message:'shop不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(nums == ''){
		res.render('admin/error',{
			message:'nums不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(color == ''){
		res.render('admin/error',{
			message:'color不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(price == ''){
		res.render('admin/error',{
			message:'price不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(peijian == ''){
		res.render('admin/error',{
			message:'peijian不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(mainpic == ''){
		res.render('admin/error',{
			message:'mainpic不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(mainpic == ''){
		res.render('admin/error',{
			message:'mainpic不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(brand == ''){
		res.render('admin/error',{
			message:'brand不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(goodStatus == ''){
		res.render('admin/error',{
			message:'goodStatus不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	if(tid == ''){
		res.render('admin/error',{
			message:'tid不能为空',
			userInfo1: req.userInfo1,
			show: 'true'
			
		});
		return;
	}
	
	//添加商品时间
	var AddTime = new Date();
	var y = AddTime.getFullYear();
	var m = AddTime.getMonth();
	var d = AddTime.getDate();
	var h = AddTime.getHours();
	var Mm = AddTime.getMinutes();
	var s = AddTime.getSeconds();
	var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒'
	
	//保存数据
	var goods = new Goods({
		index:index,
		indexImg:indexImg,
		xl:xl,
		title : title,//标题
		descript : descript,//描述
		shop : shop,//卖家
		nums : nums,//总数
		price : price,//价格
		color : color.split(';'),//颜色
		peijian : peijian,//配件
		mainpic : mainpic.split(';'),//详情图组
		date : addTime,
		brand : brand,//品牌
		goodStatus : goodStatus,//是否上架
		tid : tid//商品类别
	});
	
	return goods.save().then(function(err){
		if(err){
			res.render('admin/success',{
				message:'添加商品成功',
				userInfo1: req.userInfo1,
				show: 'true',
				url:'/user/cotegory_index'
			})
			return;
		}else{
			res.render('admin/error',{
				message:'添加商品失败',
				userInfo1: req.userInfo1,
				show: 'true'
				
			})
			return;
		}
	});
});

//修改商品处理
router.get('/cotegory_xiu',function(req, res, next) {
	if(req.userInfo1){
		var id = req.query.id
		Goods.findOne({
			_id:id
		}).then(function(result){
			if(result){
				var color = result.color.join(';');
				var mainpic = result.mainpic.join(';');
				
				res.render('admin/cotegory_xiu.html', {
					userInfo1: req.userInfo1,
					show: 'true',
					result: result,
					color:color,
					mainpic:mainpic
					
				});
				return;
			}else{
				res.render('admin/error',{
					message:'此商品不存在',
					userInfo1: req.userInfo1,
					show: 'true'
					
				})
				return;
			}
		})
	}else{
		res.render('admin/W_houtai', {
					
		});
	}
		
	
			
});
router.post('/cotegory_xiu', function(req, res, next) {

	var id = req.body.id;
	
	Goods.findOne({
		_id:id
	}).then(function(result){
		if(result){
			var index = req.body.index;
			var xl = req.body.xl || '0';
			var indexImg = req.body.indexImg || '';
			var title = req.body.title;
			var descript = req.body.descript;
			var shop = req.body.shop ;
			var nums = req.body.nums;
			var color = req.body.color;
			var price = req.body.price;
			var peijian = req.body.peijian;
			var mainpic = req.body.mainpic;
			var brand = req.body.brand;
			var goodStatus = req.body.goodStatus;
			var tid = req.body.tid;
			//修改商品时间
			var AddTime = new Date();
			var y = AddTime.getFullYear();
			var m = AddTime.getMonth();
			var d = AddTime.getDate();
			var h = AddTime.getHours();
			var Mm = AddTime.getMinutes();
			var s = AddTime.getSeconds();
			var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒'
			//替换数据
			Goods.update({
				_id:id
			},{
				index:index,
				indexImg:indexImg,
				xl:xl,
				title : title,//标题
				descript : descript,//描述
				shop : shop,//卖家
				nums : nums,//总数
				price : price,//价格
				color : color.split(';'),//颜色
				peijian : peijian,//配件
				mainpic : mainpic.split(';'),//详情图组
				date : addTime,
				brand : brand,//品牌
				goodStatus : goodStatus,//是否上架
				tid : tid//商品类别
				
			}).then(function(resul){
				if(resul != 'undefined'){
					res.render('admin/success',{
						message:'修改成功',
						userInfo1: req.userInfo1,
						show: 'true',
						url: '/user/cotegory_index'
					});
					return;
				}else{
					res.render('admin/error',{
						message:'修改失败',
						userInfo1: req.userInfo1,
						show: 'true'
					});
					return;
					
				}
			});
		}else{
			res.render('admin/error',{
				message:'此商品不存在',
				userInfo1: req.userInfo1,
				show: 'true'
			})
			return;
		}
	});
});

//删除商品处理
router.get('/cotegory_del', function(req, res, next) {
	if(req.userInfo1){
		//获取id
		var id = req.query.id;
		
		Goods.findOne({
			_id:id
		}).then(function(result){
			if(result){
				result.remove( function (err,rut){
	    			if(err){
	    				res.render('admin/error',{
							message:'删除失败',
							userInfo1: req.userInfo1,
							show: 'true'
						});
	    				return;
	    			}else{
	    				res.render('admin/success',{
							message:'删除成功',
							userInfo1: req.userInfo1,
							show: 'true',
							url: '/user/cotegory_index'
						});
	    				return;
	    			}
	    		});
			}else{
				res.render('admin/error',{
					message:'此商品不存在',
					userInfo1: req.userInfo1,
					show: 'true'
				})
				return;
			}
		});
	}else{
		res.render('admin/W_houtai', {
					
		});
	}

		
});

//渲染查询模版
router.get('/cotegory_see',function(req,res,next){
	if(req.userInfo1){
		res.render('admin/cotegory_see',{
			userInfo1: req.userInfo1,
		    show: 'true',
		})
	}else{
		res.render('admin/W_houtai',{})
	}
	
})


//商品模糊查询
router.post('/cotegory_find',function(req, res, next){
	var name = req.body.name;
	name = new RegExp("^.*"+name+".*$")
	var W_select = req.body.W_select;
	oSql[W_select] = name;
	Goods.find(oSql).then(function(result){
		res.json(result);
	});
	

});

//引入到核心模块
module.exports = router;