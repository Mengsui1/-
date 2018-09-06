//引入express
var express = require('express');

var router = express.Router();
//找到数据表
var Goods = require('../models/goods');
//前台用户表
var User1 = require('../models/user1');
//用户个人信息表
var User2 = require('../models/L_User');

//创建路由访问规则
var goodObj;
var goodsArr;
router.use(function(req, res, next) {
	// 定义格式
	responseData = {
		code: 0,
		message: '',
		name: ''
	};
	//定义数组
	goodsArr = [];
	goodObj = {};
	next();
});



//首页
router.get('/index', function(req, res, next) {
var num2Arr = [];
var num2Arr1 = [];
var num2Arr2 = [];
var num2Arr3 = [];
	Goods.find().then(function(result) {
		var result1 = result;
		Goods.find({index:'首页轮播'}).then(function(n1){
			var num1 = n1;
			Goods.find({index:'团购'}).then(function(n2){
				var num2 = n2;
				for(var i = 0; i < num2.length; i++){
					if(i<3){
						num2Arr1.push(num2[i]);
					}else if(i<6){
						num2Arr2.push(num2[i]);
					}else{
						num2Arr3.push(num2[i]);
					}
				}
				num2Arr[0] = num2Arr1;
				num2Arr[1] = num2Arr2;
				num2Arr[2] = num2Arr3;
				Goods.find({index:'智选'}).then(function(n3){
					var num3 = n3;
					Goods.find({index:'品牌'}).then(function(n4){
						var num4 = n4;
						Goods.find({index:'电子'}).then(function(n5){
							var num5 = n5;
							Goods.find({tid:'4'}).then(function(tidF){
								var n5F = [];
								for(var i = 0; i < 6; i++){
									n5F.push(tidF[i])
								}
								Goods.find({index:'数码'}).then(function(n6){
									var num6 = n6;
									Goods.find().then(function(n7){
										var numev7 = n7.sort(compareJ('xl'));
										var num7=[];
										for(var i = 0; i <10;i++){
											num7.push(numev7[i]);
										}
										
										res.render('S_pagehome.html', {
											title: req.userInfo,
											result: result1,
											num1:num1,
											num2Arr:num2Arr,
											num3_one:num3,
											num4:num4,
											num5:num5,
											num6:num6,
											num7:num7,
											n5F:n5F,
											hover: req.query.hover, //定义返回前台头部点击跳转后要显示那个首页类
										});
										return;
									});
								});
							});
						});
					});
				});
			});
		});						
	});
});
//团购页通过pa的值，判断要排序的键，xu大于0则升序，小于0降序
//小到大排序
 function compareS(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2;     // 升序
    }
}
 //大到小排序
function compareJ(property){
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value2 - value1;     // 降序
    }
}
router.get('/index/tuan', function(req, res, next) {
	var num = req.query.num || '';
	var pa = req.query.pa || '';
	var xu = req.query.xu || '';
	Goods.find({tid:'1'}).then(function(math1){
		var mathone1 = math1.length;
		Goods.find({tid:'2'}).then(function(math2){
			var mathone2 = math2.length;
			Goods.find({tid:'3'}).then(function(math3){
				var mathone3 = math3.length;
				Goods.find({tid:'4'}).then(function(math4){
					var mathone4 = math4.length;
					Goods.find({tid:'5'}).then(function(math5){
						var mathone5 = math5.length;
						Goods.find({tid:'6'}).then(function(math6){
							var mathone6 = math6.length;
							Goods.find({tid:'7'}).then(function(math7){
								var mathone7 = math7.length;
								var mathArr = [mathone1,mathone2,mathone3,mathone4,mathone5,mathone6,mathone7];

								Goods.find({index:'团轮播'}).then(function(lunbo){
									var goodLun = [];
									var lunbo1 = [];
									for(var i = 0; i < 3;i++){
										goodLun.push(lunbo[i]);
									}
									for(var j = 3; j < lunbo.length;j++){
										lunbo1.push(lunbo[j]);
									}
									Goods.find({tid:'0'}).then(function(kaituan){
										var kaituan = kaituan;
								
										if(!num) {
											var page = Number(req.query.page || 1);
											var limit = 9;
											var pages = 0;
											Goods.count().then(function(count) {
												//计算总页数
												pages = Math.ceil(count / limit);
									
												page = Math.min(page, pages);
												page = Math.max(page, 1);
									
												//设定每页跳过的数据
												var skip = (page - 1) * limit;
												if(pa == ''){
													//按规则查找
													Goods.find().limit(limit).skip(skip).then((Good) => {
														
														res.render('W_index', {
															title: req.userInfo,
															result: Good,
															count: count,
															pages: pages,
															hover: req.query.hover,
															limit: limit,
															page: page,
															arg: 'index/tuan',
															goodLun:goodLun,
															lunbo:lunbo1,
															kaituan:kaituan,
															mathArr:mathArr,
															xu:xu,
															pa:pa,
														});
														return;
										
													});
												}else{
													Goods.find().then(function(everyGood){
														var everyGood1;
														if(parseInt(xu) <= 0){
															everyGood1 = everyGood.sort(compareJ(pa));
														}else{
															everyGood1 = everyGood.sort(compareS(pa));
														}
														
														var newEvGood = [];
														var ovLimit = 0;
														if(skip+limit >= everyGood1.length){
															ovLimit = everyGood1.length - 1;
														}else{
															ovLimit = skip+limit - 1;
														}
														for (var i = 0; i <everyGood1.length;i++){
															if(i>= skip && i <= ovLimit){
																newEvGood.push(everyGood1[i]);
															}
														}
														res.render('W_index', {
															title: req.userInfo,
															result: newEvGood,
															count: count,
															pages: pages,
															hover: req.query.hover,
															limit: limit,
															page: page,
															arg: 'index/tuan',
															goodLun:goodLun,
															lunbo:lunbo1,
															kaituan:kaituan,
															mathArr:mathArr,
															xu:xu,
															pa:pa,
														});
														return;
													})
												}
											});
										} else {
											var good1 = Goods.find({tid:num});
											good1.then(function(result) {
												//找到了此类商品
												var page = Number(req.query.page || 1);
												var limit = 9;
												var pages = 0;
												//数据的个数
												var resNum = result.length;
								
												//计算总页数
												pages = Math.ceil(resNum / limit);
								
												page = Math.min(page, pages);
												page = Math.max(page, 1);
								
												//设定每页跳过的数据
												var skip = (page - 1) * limit;
												if(pa == ''){
													Goods.find({tid: num}).limit(limit).skip(skip).then((Good) => {
														res.render('Z_shangpin', {
															title: req.userInfo,
															result: Good,
															count: resNum,
															pages: pages,
															limit: limit,
															hover: req.query.hover,
															page: page,
															num: num,
															arg: 'index/tuan',
															goodLun:goodLun,
															lunbo:lunbo1,
															mathArr:mathArr,
															pa:pa,
															xu:xu,
														});
														return;
									
													});
												}else{
													Goods.find({tid:num}).then(function(everyGoodold){
														var everyGood2;
														if(parseInt(xu) <= 0){
															everyGood2 = everyGoodold.sort(compareJ(pa));
														}else{
															everyGood2 = everyGoodold.sort(compareS(pa));
														}
														
														var newEvGood1 = [];
														var ovLimit = 0;
														if(skip+limit >= everyGood2.length){
															ovLimit = everyGood2.length - 1;
														}else{
															ovLimit = skip+limit - 1;
														}
														for (var i = 0; i <everyGood2.length;i++){
															if(i>= skip && i <= ovLimit){
																newEvGood1.push(everyGood2[i]);
															}
														}
														res.render('Z_shangpin', {
															title: req.userInfo,
															result: newEvGood1,
															count: resNum,
															pages: pages,
															limit: limit,
															hover: req.query.hover,
															page: page,
															num: num,
															arg: 'index/tuan',
															goodLun:goodLun,
															lunbo:lunbo1,
															mathArr:mathArr,
															pa:pa,
															xu:xu,
														});
														return;
													})
												}
											})
										}
									});	
								});
							});
						});
					});
				});
			});
		});
	});

								
	

});
//电子竞技页
router.get('/index/dian',function(req, res, next){
	var lunbo = null;
	var shoufeng = null;
	var f1 = null;
 	var fTo = [];
 	var fTo1 = [];
 	var fTo2 = [];
 	var fTo3 = [];
 	var fTo4 = [];
	Goods.find({index:'电轮播'}).then(function(lunbo){
		lunbo = lunbo;
		Goods.find({index:'手风琴'}).then(function(shoufeng){
			shoufeng = shoufeng;
			Goods.find({index:'1F'}).then(function(f1){
				f1 = f1;
				var fOne = f1[1];
				for (var i = 6; i <12; i++){
					fTo.push(f1[i]);
				}
				Goods.find({index:'2F'}).then(function(f2){
					var f2 = f2;
					for(var i = 0; i< f2.length; i++){
						if(f2[i].indexImg != ''){
							var fTwo = f2[i]
						}
					}
//					console.log(fTwo)
					for (var i = 6; i <12; i++){
						fTo1.push(f2[i]);
					}
					for (var i = 4; i <12; i++){
						fTo3.push(f2[i]);
					}
					Goods.find({index:'3F'}).then(function(f3){
						var f3 = f3;
						
						var fThree = f3[3];
						for (var i = 6; i <12; i++){
							fTo2.push(f3[i]);
						}
						for (var i = 4; i <12; i++){
							fTo4.push(f2[i]);
						}
						res.render('L-dianZi',{
							title: req.userInfo,
							hover: req.query.hover,
							f1: f1,
							shoufeng: shoufeng,
							lunbo: lunbo,
							fTo:fTo,
							fTo1:fTo1,
							fTo4:fTo4,
							fTo3:fTo3,
							fOne:fOne,
							fTwo:fTwo,
							fThree:fThree,
							fTo2:fTo2,
						});
					
					});
				
				});
				
			});
		});
	});
						
});

//详情页
router.get('/index/details',function(req, res, next){
	var goodsId = req.query.id;
	Goods.findOne({_id:goodsId}).then(function(result){
		if(result){
			res.render('details',{
				title: req.userInfo,
				hover: req.query.hover,
				result:result
			});
		}else{
			res.send('查找的商品信息不存在');
		}
	})
			
});
//详情页查询商品处理
router.post('/index/find',function(req, res, next){
	
	var num = req.body.num;//查询商品的类型
	
	Goods.find({tid:num}).then(function(result){
		if(result){
			res.json(result);
		}else{
			return;
		}
		
	});

});

//首页查询商品处理
router.post('/index/find2',function(req, res, next){
	
	var num = req.body.num;//查询商品的类型
	
	Goods.find({index:num}).then(function(result){
		if(result){
			res.json(result);
		}else{
			return;
		}
	});

});


//前台用户退出处理
router.post('/logout', function(req, res, next) {
	// 删除cookie信息
	req.cookies.set('userInfo', null);
	responseData.code = "404";
	responseData.message = "用户退出成功";
	res.json(responseData);
	return;
});
router.get('/logout', function(req, res, next) {
	// 删除cookie信息
	req.cookies.set('userInfo', null);
	res.render('login/W_login',{})
	return;
});


// 可以存全局信息的
var objMessage;
var oPhoto;
var id;
// 创建路由的访问规则个人信息中心
router.get('/index/core',function (req,res,next){
	
	if(req.userInfo){
		 id = req.userInfo._id;
		User2.findOne({
			userId:id
		}).then(function (xingxi){
			if(xingxi){
				objMessage = xingxi;
				oPhoto =xingxi.Photo;
				//存在的话拿出信息遍历
				//
				// 渲染页面
				res.render('L_user.html',{
					objMessage:objMessage,
					oPhoto:oPhoto,
					id:req.userInfo
				});
			}else{
				// 不存在的话，存一条默认信息
				user = new User2({
					userId:id,
	 				username:'lisi',//用户名
					sex:'男',//性别
					Birthday:'1996-12-24',//生日
					region:'广东',//地域
					Photo:'',//头像
					Marriage:'未婚'//婚姻
				}).save().then(function (err){
					if(!err){
						User2.findOne({
						userId:id
						}).then(function (xingxi){
							objMessage = xingxi;
							// 渲染页面
							res.render('L_user.html',{
								objMessage:objMessage,
								oPhoto:'',
								id:req.userInfo
							});
							return;
						})
					}else{
						return;
					}
			
				});
				
				
			}

		})

	}else{
		res.render('login/W_login',{
			
		})
	}
});


// 修改个人信息
router.post('/only',function (req,res,next){
 	var id = req.userInfo._id;
 	// User2.findOne
 	User2.findOne({
 		userId:id
 	}).then(function(result){
 		if(result){
 			// 如果存在则修改数据
 			User2.update({
 		 		username:result.username,
 				sex:result.sex,
 				Birthday:result.Birthday,
 				region:result.region,
 				Marriage:result.Marriage
 			},{
 				$set:{
 					username:req.body.user==''?result.username:req.body.user,
 					sex:req.body.Sex==''?result.sex:req.body.Sex,
 					Birthday:req.body.year+'-'+req.body.mon+'_'+req.body.day,
 					region:req.body.sheng+'-'+req.body.shi,
 					Marriage:req.body.Marriage == ''?result.Marriage:req.body.Marriage
 				}
 			}).then(function (resul){
 				if(resul){
 					User2.findOne({
 						userId:id
 					}).then(function (result){
 						objMessage = result;
 						oPhoto = result.Photo;
 						// 渲染页面
						res.render('L_user.html',{
							objMessage:objMessage,
							oPhoto:oPhoto,
							id:req.userInfo
						});
 					})

// 					console.log('成功')
 				}else{
// 					console.log('失败')
 				}
 			})
 			return;

 			
 		}else{
 			// 如果不存在则插入数据
 			var user = new User2({
 				userId:id,//用户id
 				username:req.body.user,//用户名
				sex:req.body.Sex,//性别
				Birthday:req.body.year+'-'+req.body.mon+'_'+req.body.day,//生日
				region:req.body.sheng+'-'+req.body.shi,//地域
				Photo:'',//头像
				Marriage:req.body.Marriage//婚姻
 			}).save();
 			User2.findOne({
 				userId:id
 			}).then(function(xingxi){
 				objMessage = result;
 				oPhoto = result.Photo;
				// 渲染页面
				res.render('L_user.html',{
					objMessage:objMessage,
					oPhoto:'',
					id:req.userInfo
				});

 			})
 			return;
 		}
 	});

})
// 上传头像
router.post('/upload', function (req, res, next){
	var file = req.file;//获取文件信息
	oPhoto = '/public/uploads/' + file.originalname;
	var id = req.userInfo._id;

	User2.findOne({
		userId:id
	}).then(function (xingxi){
		if(xingxi){
			objMessage = xingxi;
			User2.update({
				Photo:xingxi.Photo
			},{
				$set:{
					Photo:oPhoto
				}
			}).then(function (ss){
				if(ss){
//					console.log('修改成功');
					User2.findOne({
						userId:id
					}).then(function (ss){
						res.render('L_user.html',{
							objMessage:objMessage,
							oPhoto:oPhoto,
							id:req.userInfo
						});
					})
					
				}else{
//					console.log('修改失败');
				}
			})
		}else{
//			console.log('查找失败')
		}
	})
});

// 确认用户名是否存在
router.post('/username',function (req,res,next){
	var username = req.body.username;
	User1.findOne({
		_id:req.userInfo._id,
		username:username
	}).then(function (xingxi){
		if(xingxi){
			responseData.message = '√';
			res.json(responseData);
			return;
		}else{
			responseData.message = '用户名输入错误';
			res.json(responseData);
			return;
		}
	})
	
})
// 确认密码是否正确
router.post('/password',function (req,res,next){
	var password = req.body.password;
	var username = req.body.username;
	User1.findOne({
		_id:req.userInfo._id,
		username:username,
		password:password
	}).then(function (xingxi){
		if(xingxi){
			responseData.message = '√';
			res.json(responseData);
			return;
		}else{
			responseData.message = '密码输入错误';
			res.json(responseData);
			return;
		}
	})
	
})
// 修改进密码进数据库
router.post('/newpassword',function (req,res,next){
//	console.log(req.body);
	User1.findOne({
		_id:req.userInfo._id
	}).then(function (xingxi){

		if(xingxi){
//			console.log(xingxi)
			User1.update({
				password:req.body.oldpassword
			},{
				password:req.body.newpassword
			}).then(function (xingxi){
				if(xingxi){
					responseData.message = '修改成功'
					res.json(responseData);
					return;
				}else{
					responseData.message = '修改失败';
					res.json(responseData);
					return;
				}
			})

			return;
		}else{

		}
	})
	
})
// 找回密码模块
router.get('/Retrieve',function (req,res,next){
	res.render('L_Retrieve.html',{

	})
})

// 找回密码 写进数据库
router.post('/Retrieve/password',function (req,res,next){
	var username = req.body.username;
	var password = req.body.newpassword;
//	console.log(req.body)
	User1.findOne({
		username:username
	}).then(function (xingxi){
		if(xingxi){
			User1.update({
				username:username,
				password:xingxi.password
			},{
				$set:{password:password}
			}).then(function (xingxi){
				if(xingxi){
					responseData.message="修改成功";
//					console.log('成功');
					res.json(responseData);
					return;
				}else{
					responseData.message="修改失败"
//					console.log('失败');
					res.json(responseData);
					return;
				}
			})

		}else{
			responseData.message="用户名不存在"
			res.json(responseData);
			return;
		}
	})
	
})



router.post('/duanxin', function(req, res, next) {
var x_duanxin = req.body.x_duanxin;
sendNode(x_duanxin)
function sendNode(PhoneNumbers) {
  var code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);

    const SMSClient = require('@alicloud/sms-sdk')
    // // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
    const accessKeyId = 'LTAIYH1lc6Bos16z';
    const secretAccessKey = 'ghwdIsKavBwgcm8lSklPljLh7hsnje';
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    //发送短信
    smsClient.sendSMS({
        PhoneNumbers: PhoneNumbers,
        SignName: '程序猿',
        TemplateCode: 'SMS_114070180',
        TemplateParam: '{"code":' + code + ',"product":"云通信"}'
    }).then(function (res) {
        let {Code}=res;
        let coo = code;
        if (Code === 'OK') {
            //处理返回参数
//          console.log(res)
//          console.log(coo)
            res.json(coo);
        }
    }, function (err) {
//      console.log(err)
    });

    return code;
}

});


//首页ajax请求处理模块
router.post('/index/Wajax',function(req,res,next){
	var num = req.body.num;
	
	Goods.find({index:'电子'}).then(result => {
		if(result){
			goodObj.code = '200';
			goodObj.num = num;
			goodObj.result = result;
			res.json(goodObj);
			return;
		}else{
			goodObj.code = '400';
			goodObj.num = num;
			goodObj.result = result;
			res.json(goodObj);
		}
	})
	
});
//电子竞技ajax请求处理模块
router.post('/index/Wajax2',function(req,res,next){
	var num = parseInt(req.body.num);
	var datas = req.body.datas;
	var newArr=[];
	var newobj = [];
	Goods.find({index:datas}).then(result => {
		if(result){
			for	(var j =0 ; j< result.length; j++){
				if(result[j].indexImg == ''){
					newArr.push(result[j]);
				}
			}
			for(var i = num*6; i <(num+1)*6; i++ ){
				newobj.push(newArr[i]);
			}

			goodObj.code = '200';
			goodObj.result = newobj;
			res.json(goodObj);
			return;
		}else{
			goodObj.code = '400';
			goodObj.result = result;
			res.json(goodObj);
		}
	});
	
});
// 帮助中心
router.get('/index/helps',function(req, res, next){
	res.render('Z_help',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});

router.get('/index/helps/question-1',function(req, res, next){
	res.render('Z_question-1',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-2',function(req, res, next){
	res.render('Z_question-2',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-3',function(req, res, next){
	res.render('Z_question-3',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-4',function(req, res, next){
	res.render('Z_question-4',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-5',function(req, res, next){
	res.render('Z_question-5',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-6',function(req, res, next){
	res.render('Z_question-6',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-7',function(req, res, next){
	res.render('Z_question-7',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-8',function(req, res, next){
	res.render('Z_question-8',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-9',function(req, res, next){
	res.render('Z_question-9',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});
router.get('/index/helps/question-10',function(req, res, next){
	res.render('Z_question-10',{
		title: req.userInfo,
		hover: req.query.hover,
	});
});


//引入到核心模块
module.exports = router;