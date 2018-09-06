var express = require('express');
var router = express.Router();
var User1 = require('../../models/User1');

router.use(function(req, res, next) {
	// 定义格式
	responseData = {
		code: 0,
		message: '',
		name: ''
	};
	next();
})

// 用户登录传递过来的信息
router.post('/register', function(req, res, next) {
	// 接受数据
	var username = req.body.regusername;
	var password = req.body.regpassword;
	var repassword = req.body.regrepassword;
	var phone =  req.body.phone;
	// 判断用户名是否为空
	if(username == '') {
		responstData.code = 1;
		responstData.message = '用户名不能为空';
		res.json(responstData); //返回json对象
		return;
	}

	// 密码不能为空
	if(password == '') {
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}

	// 两次密码是否一致
	if(password != repassword) {
		responseData.code = 3;
		responseData.message = '两次密码不一致';
		res.json(responseData);
		return;
	}

	// 使用数据库验证用户是否已经被注册过
	User1.findOne({
		username: username //从数据库中读取一条 判断和传过来的username值是否一致
	}).then(function(data) {
		// console.log(data);//不一致返回null
		if(data) {
			// data有值说明数据库中存在该用户名
			responseData.code = 4;
			responseData.message = '该用户名已存在';
			res.json(responseData);
			return;
		}

		// 保存数据
		var user = new User1({
			username: username,
			password: password,
			phone:phone
		})

		return user.save(); //保存数据到数据库

	}).then(function(newUserInfo) {
		// 若成功保存到数据库中则newUserInfo会返回插入成功的数据
		if(newUserInfo != undefined) {
			responseData.code = 5;
			responseData.message = '注册成功!';
			responseData.name = username;
			res.json(responseData);
			req.usernames = username;
		}
	});

})

router.get('/login', function(req, res, next) {
	res.render('login/W_login', {
		username: req.username
	});
})

router.get('/nregister', function(req, res, next) {
	res.render('login/x_login');
})

router.post('/logins', function(req, res, next) {

	var loginUsername = req.body.loginUsername;
	var loginPassword = req.body.loginPassword;

	// 验证用户的登录信息
	if(loginUsername == '' || loginPassword == '') {
		responseData.code = 1,
			responseData.message = '用户名或密码不能为空!';
		res.json(responseData);
		return;
	}

	User1.findOne({
		username: loginUsername,
		password: loginPassword
	}).then(function(userInfo) {
		// console.log(userInfo);//若与数据库符合一致会返回数据库的数据 否则返回null
		if(!userInfo) {
			responseData.code = 2,
				responseData.message = '用户名或密码';
			res.json(responseData);
			return;
		}

		// 用户名和密码均正确
		responseData.message = '登录成功';
		responseData.code = 3;
		responseData.userInfo = {
			_id: userInfo.id,
			username: userInfo.username
		}

		// 将数据写入cookie中 名字是userInfo
		req.cookies.set('userInfo', JSON.stringify({
			_id: userInfo.id,
			username: userInfo.username
		}));

		res.json(responseData);
		return;
	});
});

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


router.get('/tuichu', function(req, res, next) {
	//删除cookie中的登陆信息
    req.cookies.set('userInfo', null);
    
    return;
});

module.exports = router;