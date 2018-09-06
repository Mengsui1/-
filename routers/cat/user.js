// 引入express
var express = require('express');
var router = express.Router();
// 创建路由的访问规则
router.get('/',function (req,res,next){
	// 渲染页面
	res.render('user/L_user.html',{
		imgName:req.L_imgs,
	});
})
// 导出到核心模块
module.exports = router;