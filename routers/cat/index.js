var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.cookies.get('userInfo')){
  	res.render('login/W_head_index', { title: req.userInfo });
  }else{
  	res.render('login/W_head_index');
  }
});

router.get('/logout', function(req, res, next) {
	// 删除cookie信息
	req.cookies.set('userInfo', null);
	responseData.code = '404';
	responseData.message = '退出成功';
	res.json(responseData);
	return;
})

module.exports = router;
