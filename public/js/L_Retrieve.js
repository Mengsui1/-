window.onload=function(){


	// 正则验证手机和密码
	var a = [/^1[3|4|5|7|8][0-9]{9}$/,/^[\w\-\?\#\*\.\+\$\%\&\^\!\@\(\)\=\~]{6,18}$/];
	// 用户名验证
	// $('.L_foot_form').find('input').eq(0).blur(function(){
	// 	$.ajax({
	// 		type:'post',
	// 		url:'',
	// 		data:{

	// 		},
	// 		dataType:'json',
	// 		success:function(res){}
	// 	})
	
	// })
	var coo=1234;//定义接收验证码的变量
	var password;//定义新密码的值
	// 获取手机验证码
	$('.L_duanxi').on('click',function(){
		$.ajax({
			type:'post',
			url:'/api/duanxin',//这里是短信路由
			data:{
				
			},
			dataType:'json',
			success:function(res){
				console.log(res);
				coo = res;
			}
		})
	})

	// 密码正则验证
	$('.L_foot_form').find('input').eq(3).blur(function(){
		if(a[1].test($(this).val())){
			$(this).next('small').html('√').css({'color':'green','font-weight':'700'});
    		$('.L_foot_form').find('input').eq(4).removeAttr('disabled');
		}else{
			$(this).next('small').html('密码格式错误').css('color','red');
    		$(".L_foot_form input[type='submit']").attr('disabled','disabled');
		}
	});

	// 确认密码验证
	$('.L_foot_form').find('input').eq(4).blur(function(){
    	if($(this).val() == ''){
    		$(this).next('small').html('确认密码不能为空').css('color','red');
            $(".L_foot_form button").attr('disabled','disabled');
            
    	}else{
    		if($(this).val() == $('.L_foot_form').find('input').eq(3).val()){
    			$(this).next('small').html('√').css({'color':'green','font-weight':'700'});
                $('.L_foot_form').find('button').removeAttr('disabled');
               
    		}else{
    			$(this).next('small').html('两次输入密码不一致').css('color','red');
                $(".L_foot_form button").attr('disabled','disabled');
    		}
    	}
    });

	$('.submit2').on('click',function(){
		// console.log(111)
		// 接收用户填写验证码的值
		var val = $('.L_foot_form').find('input').eq(2).val();
		// 用户密码
		var newpassword = $('.L_foot_form').find('input').eq(3).val();
		// 用户名
		var username = $('.L_foot_form').find('input').eq(0).val();
		if(coo == val){
			$.ajax({
				type:'post',
				url:'/Retrieve/password',
				data:{
					username:username,
					newpassword:newpassword
				},
				dataType:'json',
				success:function(res){
					if(res.message=='修改成功'){
						alert(res.message);
						window.location.href = '/api/login';
						return;
					}
					if(res.message =='修改失败'){
						alert(res.message);
						return;
					}
					if(res.message =='用户名不存在'){
						alert(res.message);
						return;
					}
				}
			})
		}else{
			alert('验证码错误');
		}
		
	})

	
}

