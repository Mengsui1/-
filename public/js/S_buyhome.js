//city地址联动
	var city = document.getElementById('city');
	var area = document.getElementById('area');

	// 利用了两个数组下标的关联性
	var city_data = ['广东', '上海', '香港', '北京'];
	var area_data = [
			['广州', '茂名', '佛山', '江门','深圳'],
			['闸北', '虹口', '宝山'],
			['湾仔', '九龙', '铜锣湾'],
			['朝阳', '昌平','三里屯'],
	];

	// 城市初始化
	for (var i = 0; i < city_data.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = city_data[i];
		opt.value = i;
		city.appendChild(opt);
	}

	// 区域初始化
		for (var j = 0; j < area_data[0].length; j++) {
			var opt = document.createElement('option');
			opt.innerHTML = area_data[0][j];
			opt.value = j;
			area.appendChild(opt);
		}

		// 值被改变是触发
		city.onchange = function() {
			// 先清除旧数据
			area.length = 1;

			//遍历添加
			for (var i = 0; i < area_data[this.value].length; i++) {
				var opt = document.createElement('option');
				opt.innerHTML = area_data[this.value][i];
				opt.value = i ;
				area.appendChild(opt);
			}
		};


		// 控制地图的显示隐藏、拖拽
		$('#S_api').bind('click',function () {
			$('.S_api_in').css('display','block')
		})
		$('.S_close_api').bind('click',function () {
			$('.S_api_in').css('display','none')
		})


// 收货地址管理

		// 保存按钮标识位
		 	var oUSERflag = false;
		 	var oCITYflag = false;
		 	var oADDflag = false;
		 	var oUNICODEflag = false;
		 	// var oTELLflag = false;
		 	var oPHONEflag = false;
		 	var oEMAILflag = false;

		 	// 收货人
		 	$('.S_name>input').bind('blur',function () {
		 		if (!$('.S_name>input').val() == '') {
					$('.S_name>input').css('border','1px solid green')
					$('.S_shouhuo').css('display','block')
					oUSERflag=true;
				}
				// console.log(oUSERflag);
				if ($('.S_name>input').val() == '') {
					$('.S_shouhuo').css('display','none')
					$('.S_name>input').css('border','1px solid red')
				}
		 	})
			
		 	// 详细地址
		 	$('.S_smalladd>textarea').bind('blur',function () {
		 		if (!$('.S_smalladd>textarea').val() == '') {
					$('.S_smalladd>textarea').css('border','1px solid green')
					$('.S_xiangxi').css('display','block')
					oADDflag = true;
				}
				if ($('.S_smalladd>textarea').val() == '') {
					$('.S_xiangxi').css('display','none')
					$('.S_smalladd>textarea').css('border','1px solid red')
				}
		 	})

		 	// 邮政编码
		 	var unico = /^[1-9][0-9]{5}$/;
		 	$('.S_unicode>input').bind('blur',function () {
		 		if (unico.test($('.S_unicode>input').val())) {
					$('.S_unicode>input').css('border','1px solid green')
					$('.S_youbian').css('display','block')
					oUNICODEflag = true;
				}
				if (!unico.test($('.S_unicode>input').val())) {
					$('.S_youbian').css('display','none')
					$('.S_unicode>input').css('border','1px solid red')
				}
		 	})

		 	// 手机号码
		 	 var num = /^1(3|4|5|7|8)\d{9}$/;
		 	 $('.S_phonetel>input').bind('blur',function () {
		 		if (num.test($('.S_phonetel>input').val())) {
					$('.S_phonetel>input').css('border','1px solid green')
					$('.S_shouji').css('display','block')
					oPHONEflag = true;
				}
				if (!num.test($('.S_phonetel>input').val())) {
					$('.S_shouji').css('display','none')
					$('.S_phonetel>input').css('border','1px solid red')
				}
		 	})

		 	 // 电子邮箱
		 	 var qq = /^[a-zA-Z\d][\.\-\w]+@[\w\-]+(\.com|\.cn|\.com\.cn)$/;
		 	 $('.S_email>input').bind('blur',function () {
		 	 	// console.log($('.S_email>input').val());
		 	 	if (qq.test($('.S_email>input').val())) {
					$('.S_email>input').css('border','1px solid green')
					$('.S_youxiang').css('display','block')
					oEMAILflag = true;
				}
				if (!qq.test($('.S_email>input').val())) {
					$('.S_youxiang').css('display','none')
					$('.S_email>input').css('border','1px solid red')
				}
		 	})
// 所有标识位为true的时候才执行保存的操作
//	console.log(oUSERflag,oADDflag,oUNICODEflag,oPHONEflag,oEMAILflag)
	
	$('#S_btn').on('click',function(){
		if (oUSERflag==true&&oADDflag==true&&oUNICODEflag==true&&oPHONEflag==true&&oEMAILflag==true) {
//			console.log(oUSERflag,oADDflag,oUNICODEflag,oPHONEflag,oEMAILflag)
			var moren = $('.x_moren').is(':checked');

			if(moren == true) {
				moren = '是';
			}else{
				moren = '否'
			}
			// alert($('.x_moren').checked)
			var ii = $('#city').val();
			// console.log(city_data[ii]);
			var tt = $('#area').val();
			// console.log(area_data[ii][tt]);
			$.ajax({
				type:'post',
				url:'/user2/addappend',
				data:{
					// 收货人
					name:$('.S_name > input[type="text"]').val(),
					sheng:city_data[ii] + '-' + area_data[ii][tt],
					dizhi:$('.S_smalladd>textarea').val(),
					postdz:$('.S_unicode>input').val(),
					shouji:$('.S_phonetel>input').val(),
					email:$('.S_email>input').val(),
					moren : moren
				},
				dataType:'json',
				success:function(res){
					if(res) {
						console.log(res)
						window.location.href = '/user2/addappenda';
					}
				}
			})
		}
	})	
			
	//用户退出处理
	$('.W_out').on('click',function(){
		$.ajax({
            type: 'post',
            url: '/logout',
            success: function (result) {
                if(result.code == '404'){
                    window.location.href = '/index';
                }
            }
        });
	});	
			

			
// 百度地图
//console.log($('#case2'));
$('#Map_input_address').bind('focus',function () {
	// console.log($('#Map_input_address').val());
	console.log(0);
})

// 点击订单和个人地址管理切换
// 默认
$('.S_main_right').css('display', 'block');
$('.S_add').css('display', 'none');
$('.S_small_ul').eq(0).children().eq(0).on('click', function(){
	$('.S_main_right').css('display', 'block');
	$('.S_add').css('display', 'none');
})
$('.S_small_ul').eq(4).children().eq(0).on('click', function(){
	$('.S_main_right').css('display', 'none');
	$('.S_add').css('display', 'block');
})
// console.log($('.x_yinoid').html())

// 删除订单
$('.x_delorder > a').on('click', function() {
	// alert($(this).parent().siblings('.x_yinoid').html())
	$.ajax({
		type: 'post',
		url: '/user2/delOrder',
		data : {
			oid : $(this).parent().siblings('.x_yinoid').html()
		},
		success : function(res) {
			console.log(res)
			if(res.code == 200) {
				alert('删除成功');
				window.location.reload();
			}else if(res.code == 1) {
				alert('删除失败');
			}
		}
	})
})

// 保存数据在页面
$('#S_btn').bind('click',function() {

})
