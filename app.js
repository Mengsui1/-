//1.加载express
var express = require('express');

//2引入body-parser
var bodyParser = require('body-parser');

//3.创建app应用  [相当于node.js中的http.createServer()]
var app = express();
//引入文件处理模块
var fs = require('fs');
// 引入文件上传模块multer
var multer = require('multer');
//连接后台数据库
var User = require('./models/User');
//4加载cookies模块
var Cookies = require('cookies');

var storage  = multer.diskStorage({
//上传图片的路径，是在你的静态目录下（public）uploads会自动进行创建
    destination: 'public/uploads',
 //给上传文件重命名，获取添加后缀名
    filename: function(req, file, callback){     
        callback(null, file.originalname);
    }
})
var upload = multer({
    storage: storage
});
//5设定公共区域访问解析
app.use('/public', express.static(__dirname + '/public'));

//6.加载第三方模板处理模块
var swig = require('swig');

//7加载mongoose模块
var mongoose = require('mongoose');

//8定义模板引擎
app.engine('html', swig.renderFile);

//9设定模板引擎设置
app.set('views', './views');

// 单文件上传解析处理
app.use(upload.single('upfile'));//这里的参数要使用表单文件上传中的input控件名

//10.定义项目使用的模板引擎
app.set('view engine', 'html');

//11关闭swig模板缓存
swig.setDefaults({cache: false});
//12
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {

    //获取cookie对象
    req.cookies = new Cookies(req, res);

    if (req.cookies.get('userInfo')) {
        try {
        	req.userInfo = JSON.parse(req.cookies.get('userInfo'));
			next();
        } catch (e) {
            next();
        }
    } else{
        next();
    }
});
app.use(function(req, res, next){
	//获取cookie对象
    req.cookies1 = new Cookies(req, res);

    if (req.cookies1.get('userInfo1')) {
        try {
            req.userInfo1 = JSON.parse(req.cookies.get('userInfo1'));

            User.findById(req.userInfo1._id).then(function (user) {
                // console.log(user);

                req.userInfo1.isAdmin = user.isAdmin;
                next();
            });

        } catch (e) {
            next();
        }
    } else{
        next();
    }
});

//首页
app.use('/', require('./routers/W_index'));

//后台ajax处理逻辑模块
app.use('/api1', require('./routers/admin/api1'));

//管理员后台登录管理界面
app.use('/user', require('./routers/admin/admin.js'));

//前台建立处理ajax请求模块
app.use('/api', require('./routers/login/api'));

// 后台订单处理模块
app.use('/order', require('./routers/admin/order.js'));

// 地址模块
app.use('/admin', require('./routers/x_add/main'));

app.use('/user2', require('./routers/x_add/api'));

app.use('/main',require('./routers/cat/main'));//前台模块

app.use('/cat',require('./routers/cat/cat'));//购物车模块

app.use('/user',require('./routers/cat/user'));//个人中心模块

app.use('/yd',require('./routers/yd'));

// 插入数据
// app.use('/insert', require('./routers/cat/insert'));

//连接mongoDB数据库
mongoose.connect('mongodb://localhost:27017/blog', {useMongoClient: true}, function (err) {

    if (err) {
        console.log('数据库连接失败!');
        return;
    } else {
        console.log('数据库连接成功!');
        //端口监听
        app.listen(8998);
    }
});

















