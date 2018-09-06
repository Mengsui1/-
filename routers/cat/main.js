// 引入express
var express = require('express');
var router = express.Router();

//创建路由访问规则
router.get('/', function (req, res, next) {
    //渲染
    res.render('main/L-dianZi.html', {});//对象里面是传参数的
});

//引入到核心模块
module.exports = router;//指上面var router