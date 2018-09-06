var express = require('express');
var router = express.Router();
router.get('/shouye',function (req,res,next) {
	// 渲染页面
				res.render('yd/index/S_pagehome.html',{
					
				});
})

router.get('/fenlei',function (req,res,next) {
	// 渲染页面
				res.render('yd/category/L_fenlei.html',{
					
				});
})

router.get('/gouwu',function (req,res,next) {
	// 渲染页面
				res.render('yd/ordercat/shopcar.html',{
					
				});
})

router.get('/me',function (req,res,next) {
	// 渲染页面
				res.render('yd/me/my.html',{
					
				});
})
//引入到核心模块
module.exports = router;