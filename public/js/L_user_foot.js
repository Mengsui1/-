window.onload = function(){
	var sheng = document.getElementById('sheng');
	var shi = document.getElementById('shi');
	var qu = document.getElementById('qu');
	var sheng_data = ['广东','江西'];
	var shi_data = [
		['广州市','汕头市'],
		['南昌','九江'],
	];
	var qu_data = [['天河区','从化区'],['金平区','澄海区'],['九阴真经','化骨绵掌'],['泡脚凤爪','大刀肉']];
	var index = 0;//设置索引
	// 省区域初始化
	// 
	// index2 += shi_data[i].length;
	for(var i = 0;i<sheng_data.length;i++){
		// 创建元素
		var opt = document.createElement('option');
		// 设置文字
		opt.innerHTML = sheng_data[i];
		// 设置值
		opt.value = i;
		// 设置索引
		// opt.index = i;
		sheng.appendChild(opt);
	}
	// 市区域初始化
	for(var i = 0;i<shi_data[0].length;i++){
		// 创建元素
		var opt = document.createElement('option');
		// 设置文字
		opt.innerHTML = shi_data[0][i];
		// 设置值
		opt.value = i;
		// 设置索引
		// opt.index = i;
		shi.appendChild(opt);
	}
	// 区域初始化
	for(var i = 0;i<qu_data[0].length;i++){
		// 创建元素
		var opt = document.createElement('option');
		// 设置文字
		opt.innerHTML = qu_data[0][i];
		// 设置值
		opt.value = i;
		// 设置索引
		// opt.index = i;
		qu.appendChild(opt);
	}

	// 值被改变是触发
	sheng.onchange = function(){
		//先清空旧数据
		shi.length = 1;
		// 遍历添加
		for(var i = 0;i <shi_data[this.value].length;i++){
			// 创建元素
            var opt = document.createElement('option');
			// 设置文字
            opt.innerHTML = shi_data[this.value][i];
            // 设置索引
            opt.value = i;
            // 添加节点
            shi.appendChild(opt);
		}
		for(var i = 0; i < this.value;i++){
			index += shi_data[i].length;
		}
		// console.log(index)

	};

	shi.onchange = function(){
		// 清空旧数据
		qu.length = 1;
		var j = parseInt(this.value)
		// 遍历添加
		for(var i = 0; i < qu_data[index + j].length;i++){
			// 创建元素
            var opt = document.createElement('option');
            // 设置文字
            opt.innerHTML = qu_data[index + j][i];
            // 设置索引
            opt.value = i;
            // 添加节点
            qu.appendChild(opt);
		}
		index = 0;
	}
	// 修改个人信息按钮
	var aclick = document.getElementsByClassName('L_click');
	var L_personal = document.getElementsByClassName('L_personal');
	// console.log(aclick);
	for(var i = 0; i < aclick.length;i++){
		aclick[i].index = i;
		aclick[i].onclick = function(){
			for(var j = 0; j < L_personal.length;j++){
				L_personal[j].style.display = 'none';
			}
			// console.log(this.index);
			var index = this.index == 0 ? 1 : 0; 
			L_personal[index].style.display = 'block';
		}
	}

    // 提交按钮
    $('.submit').on('click',function(){
    })

	// 上传文件
	var photo = document.getElementsByClassName('photo');
	var file = document.getElementById('file');
    //判断浏览器是否支持FileReader接口
    if (typeof FileReader == 'undefined') {
        document.getElementById("xmTanDiv").InnerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
        //使选择控件不可操作
        document.getElementById("xdaTanFileImg").setAttribute("disabled", "disabled");
    }
    file.onchange = function(){
    	var file = this.files[0];
    	var reader = new FileReader();
    	//读取文件过程方法
        reader.onloadstart = function (e) {
            // console.log("开始读取....");
        }
        reader.onprogress = function (e) {
            // console.log("正在读取中....");
        }
        reader.onabort = function (e) {
            // console.log("中断读取....");
        }
        reader.onerror = function (e) {
            // console.log("读取异常....");
        }
        reader.onload = function (e){
        	// console.log('成功读取');
        	for(var i = 0;i<photo.length;i++){
        		photo[i].src = e.target.result;
        	}
        }
         reader.readAsDataURL(file)
    }


   // 点击更改信息栏
    $('.L_left dd').find('a').each(function(i){

    	$(this).on('click',function(){
    		$('.L_left').find('a').attr('class','');
    		$(this).attr('class','L_color2');

    		$('.L_form').css('display','none');
    		$('.L_form').eq(i).css('display','block');

    	})
    })
    // 点击更改其他详细信息
    $('.L_qita_bt').find('a').each(function(i){
    	$(this).on('click',function(){
    		$('.L_qita_bt').find('a').attr('class','');
    		$(this).attr('class','L_qita_color');

    		$('.L_qita_foot').css('display','none');
    		$('.L_qita_foot').eq(i).css('display','block')
    	})
    	
    })
    
    var a = [/^1[3|4|5|7|8][0-9]{9}$/,/^[\w\-\?\#\*\.\+\$\%\&\^\!\@\(\)\=\~]{6,18}$/]
    // 正则手机验证验证
    // 验证用户名
    $('.L_foot_form').find('input').eq(0).blur(function(){
        var that = $(this)
        $.ajax({
            type:'post',
            url:'/username',
            data:{
                username:$(this).val()
            },
            dataType:'json',
            success:function(res){
                if(res.message == '√'){
                    that.next('small').html(res.message).css('color','green');
                }else{
                    $(".L_foot_form button").attr('disabled','disabled');

                    that.next('small').html(res.message).css('color','red');
                }
            }
        })

    });
    //验证旧密码
    $('.L_foot_form').find('input').eq(1).blur(function(){
        var that = $(this)
        $.ajax({
            type:'post',
            url:'/password',
            data:{
                username:$('.L_foot_form').find('input').eq(0).val(),
                password:$(this).val()
            },
            dataType:'json',
            success:function(res){
                 if(res.message == '√'){
                    that.next('small').html(res.message).css('color','green');
                }else{
                    $(".L_foot_form button").attr('disabled','disabled');
                    

                    that.next('small').html(res.message).css('color','red');
                }
            }
        })

    });

    // 正则密码验证
    $('.L_foot_form').find('input').eq(2).blur(function(){
    	if($(this).val() == ''){
    		$(this).next('small').html('密码不能为空').css('color','red');
    		$(".L_foot_form input[type='submit']").attr('disabled','disabled');
    	}else{
    		if(a[1].test($(this).val() )){
    			$(this).next('small').html('√').css({'color':'green','font-weight':'700'});
    			$('.L_foot_form').find('input').eq(3).removeAttr('disabled');

                // 成功传密码给
    		}else{
    			$(this).next('small').html('密码格式错误').css('color','red');
    			$(".L_foot_form input[type='submit']").attr('disabled','disabled');

    		}
    	}
    });
    // 确认密码
    $('.L_foot_form').find('input').eq(3).blur(function(){
    	if($(this).val() == ''){
    		$(this).next('small').html('确认密码不能为空').css('color','red');
            $(".L_foot_form input[type='submit']").attr('disabled','disabled');
            

    	}else{
    		if($(this).val() == $('.L_foot_form').find('input').eq(2).val()){
    			$(this).next('small').html('√').css({'color':'green','font-weight':'700'});
                $('.L_foot_form').find('button').removeAttr('disabled');
               
    		}else{
    			$(this).next('small').html('两次输入密码不一致').css('color','red');
                $(".L_foot_form input[type='submit']").attr('disabled','disabled');
    		}
    	}
    });
    // 提交修改密码
    $('#L_btn').on('click',function(){
        $.ajax({
            type:'post',
            url:'/newpassword',
            data:{
                oldpassword:$('.L_foot_form').find('input').eq(1).val(),
                newpassword:$('.L_foot_form').find('input').eq(2).val()
            },
            dataType:'json',
            success:function (res){
                if(res.message == '修改成功'){
                    alert(res.message);
                    window.location.href = '/api/login';
                    // 清空cookie
                }else{
                    alert(res.message);
                }
            }
        })
    })



    
}