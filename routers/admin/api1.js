var express = require('express');

var router = express.Router();

//数据库连接
var User = require('../../models/User');
var resData;
router.use(function (req, res, next) {

    //定义返回前台的信息
    resData = {
    	code: '',
        message: '',
        name: ''
    };
	
    //必须要有！
    next();//向下传递

});
//用户登录
router.post('/user',function(req, res, next){
	var username = req.body.username;
    var password = req.body.password;
	if(username=="" && password==""){
		resData.code = '1';
        resData.message = '账户或密码不能为空';
        resData.name = '';
        res.json(resData);
		return;
	}
	
	User.findOne({
		username: username,
		password: password,
	}).then(function(result){
		//判断是否存在此帐号
		if(result){
			//登录成功将信息写入cookies
			req.cookies.set('userInfo1', JSON.stringify({
	            _id: result._id,
	            isAdmin: result.isAdmin,
	            username: result.username
	        }));
	        resData.code = '2';
	        resData.message = '登录成功...正在进入后台首页';
	        resData.name = result.username;
	        res.json(resData);
	        return;

		}else{
			resData.code = '3';
	        resData.message = '登录失败...请重新输入';
	        resData.name = '';
	        res.json(resData);
	        return;
		}
	});

});
//用户退出登录，清除cookies中的数据

router.post('/quit', function(req, res, next) {
	//删除cookie中的登陆信息
    req.cookies.set('userInfo1', null);
    resData.code = '404';
    res.json(resData);
    return;
});




module.exports = router;