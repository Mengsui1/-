$(function() {
	var W_timer = null;

	function trim(str) {
		return str.replace(/^(\s*)|(\s*)$/g, "");
	}
	//封装时间原型函数
	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if(/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for(var k in date) {
			if(new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
					date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}
		var newDate = new Date();
		var time = newDate.format('yyyy-MM-dd h:m:s');
		$('.timerObj').html('当前时间:' + time);
	//首页计时
	setInterval(function() {
		var newDate = new Date();
		var time = newDate.format('yyyy-MM-dd h:m:s');
		$('.timerObj').html('当前时间:' + time);
	}, 1000);

	//用户登录处理
	$('#W_btn').on('click', function() {

		var $Box = $('.form-signin');
		$.ajax({
			type: 'post',
			url: "/api1/user",
			data: {
				username: $Box.find('[name=username]').val(),
				password: $Box.find('[name=password]').val(),
			},
			dataType: 'json', //指定要返回的数据类型
			success: function(data) {
				console.log(data);

				window.location.reload();
			}
		});
	});
	//用户退出处理
	$('#tui').on('click', function() {
		//确认用户退出
		if(confirm('确认退出吗?')) {
			$.ajax({
				type: 'post',
				url: '/api1/quit',
				success: function(result) {
					if(result.code == 404) {
						window.location.href = '/user';
					}
				}
			});
		}
	});

	var W_stop = true;
	//删除后台用户操作
	$('.W_user_link').on('click', function() {
		if(W_stop) {
			W_stop = false;
			var W_hideTit = $('.W_hideTit'); //提示信息的对像

			//确认删除用户吗
			if(confirm('确认删除吗?')) {
				$.ajax({
					type: 'post',
					data: {
						W_user_id: $(this).parent().parent().find('.W_user_id').html()
					},
					url: '/user/userDel',
					success: function(result) {
						if(result.code == '200') {
							W_stop = true;
							window.location.reload();
						} else if(result.code == '300') {
							clearTimeout(W_timer);
							W_hideTit.css({
								'display': 'block',
								'color': 'red'
							}).html(result.message);
							W_timer = setTimeout(function() {
								W_hideTit.css({
									'display': 'none',
									'color': 'red'
								}).html('');
							}, 5000);
						}

					}
				});
			}else{
				window.location.reload();
			}
		}

	});
	//添加后台用户处理
	//创建警告框弹出效果
	$('#W_addUser').on('click', function() {
		var Addusername = $(this).parent().parent().find('.add_username'); //接收添加的用户名
		var Addpassword = $(this).parent().parent().find('.add_password'); //接收添加用户名的密码
		var W_hideTit = $('.W_hideTit'); //提示信息的对像
		var Addval = null; //用单选选中的那个的value的值来判断是注册管理员还是普通帐号
		//判断单选按钮选中时的value值
		var W_addUserR = document.getElementsByClassName('addUserR');
		for(var i = 0; i < W_addUserR.length; i++) {
			if(W_addUserR[i].checked) {
				Addval = W_addUserR[i].value;
			}
		}

		if(Addusername.html() == '' && Addpassword.html() == '') {
			alert('用户名和密码不能为空');
			return;
		} else {
			$.ajax({
				type: 'post',
				data: {
					Addusername: Addusername.html(),
					Addpassword: Addpassword.html(),
					Addval: Addval
				},
				url: '/user/userAdd',
				success: function(result) {
					if(result.code == '0' || result.code == '1') {

					} else if(result.code == '3') {
						clearTimeout(W_timer);
						$('.W_hideTit').css({
							'display': 'block',
							'color': 'red'
						}).html(result.message);
						Addusername.html('');
						W_timer = setTimeout(function() {
							$('.W_hideTit').css({
								'display': 'none',
								'color': 'red'
							}).html('');
						}, 5000);
					} else if(result.code == '4') {
						window.location.reload();

					} else if(result.code == '300') {
						clearTimeout(W_timer);
						W_timer = W_hideTit.css({
							'display': 'block',
							'color': 'red'
						}).html(result.message);
						setTimeout(function() {
							W_hideTit.css({
								'display': 'none',
								'color': 'red'
							}).html('');
						}, 5000);
					}
				}
			});
		}

	});

	//左侧导航特效
	(function() {
		var obox = document.getElementsByClassName('W_nb_box'); //找到触发事件的对象组
		var Ul = document.getElementsByClassName('W_nb_ul');
		var falg = []; //设定标志位
		var Height = 0; //记录下拉菜单ul的高
		for(var i = 0; i < obox.length; i++) {
			falg[i] = 1;
			obox[i].index = i;
			obox[i].onclick = function() {
				var This = this;
				var oI = this.children[0];
				var oUl = this.nextSibling.nextSibling;
				for(var j = 0; j < oUl.children.length; j++) {
					Height = oUl.children.length * parseInt(getStyle(oUl.children[j], 'height'));
				}
				if(falg[this.index]) {
					oI.style.transform = 'rotate(180deg)';
					move(oUl, {
						'height': Height
					}, function() {
						falg[This.index] = 0;
					});

				} else {
					oI.style.transform = 'rotate(0deg)';
					move(oUl, {
						'height': 0
					}, function() {
						falg[This.index] = 1;
					});
				}

			}
		}
	})();

	//	响应式布局处理
	var W_falg_topicon = true;
	$('.w_show_btn').on('click', function() {
		if(W_falg_topicon) {
			$('.W_nav').css({
				'display': 'block'
			});
			W_falg_topicon = false;
		} else {
			$('.W_nav').css({
				'display': 'none'
			});
			W_falg_topicon = true;
		}

	});
	//权限判断
	$('.W_admin_quanxian').each(function(index, result) {
		var W_admin_quanxian = result.getAttribute('data-quanxian');

		if(W_admin_quanxian == '2') {
			result.innerHTML = '会员账户，可以修改数据，没有删除与添加权限';
			result.style.color = 'red';
		} else if(W_admin_quanxian == '1') {
			result.innerHTML = '普通账户,只允许查看数据，没有管理权限';
		} else if(W_admin_quanxian == '3') {
			result.innerHTML = '超级管理员';
		}
	});
	//修改用户信息处理
	$('.W_user_btn2').on('click', function() {
		var amendName = $(this).parent().parent().find('td:nth-of-type(1)');
		var amendPass = $(this).parent().parent().find('td:nth-of-type(2)');
		var amendNewPass = $(this).parent().parent().find('td:nth-of-type(3)');
		//验证账户名是否为空
		if(amendName == '') {
			clearTimeout(W_timer);
			$('.W_hideTit').css({
				'display': 'block',
				'color': 'red'
			}).html('账户名不能为空');
			W_timer = setTimeout(function() {
				$('.W_hideTit').css({
					'display': 'none',
					'color': 'red'
				}).html('');
			}, 5000);
			return;
		}
		var XiuAdd = document.getElementsByClassName('XiuAdd');
		for(var i = 0; i < XiuAdd.length; i++) {
			if(XiuAdd[i].checked) {
				XiuAdd1 = XiuAdd[i].value;
			}
		}
		//验证输入的旧密码是否为空
		if(amendPass == '') {
			clearTimeout(W_timer);
			$('.W_hideTit').css({
				'display': 'block',
				'color': 'red'
			}).html('密码不能为空');
			W_timer = setTimeout(function() {
				$('.W_hideTit').css({
					'display': 'none',
					'color': 'red'
				}).html('');
			}, 5000);
			return;
		}
		//验证新密码是否为空
		if(amendNewPass == '') {
			clearTimeout(W_timer);
			$('.W_hideTit').css({
				'display': 'block',
				'color': 'red'
			}).html('新密码不能为空');
			W_timer = setTimeout(function() {
				$('.W_hideTit').css({
					'display': 'none',
					'color': 'red'
				}).html('');
			}, 5000);
			return;
		}
		if(amendName != '' && amendPass != '' && amendNewPass != '') {
			clearTimeout(W_timer);
			$('.W_hideTit').css({
				'display': 'block',
				'color': 'red'
			});
			W_timer = setTimeout(function() {
				$('.W_hideTit').css({
					'display': 'none',
					'color': 'red'
				}).html('');
			}, 5000);
			//ajax发送请求
			$.ajax({
				type: 'post',
				data: {
					Xiuusername: amendName.html(),
					Xiupassword: amendPass.html(),
					XiuIsAdd:XiuAdd1,
					XiuNewpassword: amendNewPass.html()
				},
				url: '/user/userXiu',
				success: function(result) {
					if(result.code == '0' || result.code == '1') {

					} else if(result.code == '2') {
						clearTimeout(W_timer);
						$('.W_hideTit').css({
							'display': 'block',
							'color': 'red'
						}).html(result.message);
						amendName.html('');
						W_timer = setTimeout(function() {
							$('.W_hideTit').css({
								'display': 'none',
								'color': 'red'
							}).html('');
						}, 5000);
					} else if(result.code == '200') {
						//修改成功后刷新页面
						alert('您的账户' + result.username + '信息修改成功!!!!');
						window.location.reload();
					} else {
						clearTimeout(W_timer);
						$('.W_hideTit').css({
							'display': 'block',
							'color': 'red'
						}).html(result.message);
						W_timer = setTimeout(function() {
							$('.W_hideTit').css({
								'display': 'none',
								'color': 'red'
							}).html('');
						}, 5000);
					}
				}
			});
		}
	});

	//删除前台用户处理
	$('.user_money_del').on('click', function() {
		if(confirm('确认删除吗?')) {
			var W_hideTit = $('.W_hideTit'); //提示信息的对像
			$.ajax({
				type: 'post',
				data: {
					W_user_id: $(this).parent().parent().find('.W_user_id').html()
				},
				url: '/user/users_moneyDel',
				success: function(result) {

					if(result.code == '200') {
						W_stop = true;
						window.location.reload();
					} else if(result.code == '300') {
						clearTimeout(W_timer);
						W_hideTit.css({
							'display': 'block',
							'color': 'red'
						}).html(result.message);
						W_timer = setTimeout(function() {
							W_hideTit.css({
								'display': 'none',
								'color': 'red'
							}).html('');
						}, 5000);
					}

				}
			});
		}
	})
});