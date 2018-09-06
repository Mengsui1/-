// window.onload = function() {
	// 输入用户名
	var phoneNum = document.getElementsByClassName('x_input_text')[0];
	var inputRemind = document.getElementsByClassName('x_remind_info')[0];
	var remindInfo = document.getElementsByClassName('x_remind')[0];
	var tel = document.getElementsByClassName('x_iphone_text')[0];
	var telInfo = document.getElementsByClassName('x_remind_tel')[0];
	var telWran = document.getElementsByClassName('x_phone_info')[0];
	// console.log(remindInfo.children[0]);
	var phoneFlag = false;
	var passFlag = false;
	var repassFlag = false;
	var successFlag = false;
	var telFlag = false;
	var resFlag = false;
	var x_duaninput = $('.x_message_code').val();
	var shortmessage = ''
	var x_duanxin = $('.x_iphone_text').val();
	$('.x_get_mess').on('click', function() {
		
		$.ajax({
			type : 'post',
			url : '/api/duanxin',
			data: {
				x_duanxin : x_duanxin
			},
			success : function(res) {
//				console.log(res)
				if(res) {
					shortmessage = res;
				}
			}
		})
	})
	// 手机
	tel.onblur = function() {
		var str = tel.value;
		var reg =  /^1[3|4|5|7|8][0-9]{9}$/;
		if(str != '') {
			if(!reg.test(str)) {
				telInfo.style.display = 'block';
				telInfo.style.color = "#CC0000";
				telInfo.innerHTML = '<span></span>格式有误';
				telInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
				telFlag = false;
			}else{
				telInfo.style.display = 'block';
				telInfo.innerHTML = '<span></span>正确';
				telInfo.style.color = "black"
				telWran.innerHTML = "";
				telInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -160px";
				telFlag = true;
			}
		}else{
			telWran.innerHTML = " 请填写用户名";
			telInfo.style.display = 'none';
			telFlag = false;
		}
		
	}
	// 短信验证码
	var messCode = document.getElementsByClassName('x_message_code')[0];
	var messInfo = document.getElementsByClassName('x_message_info')[0];
	var messWarn = document.getElementsByClassName('x_remind_mes')[0];
	messCode.onblur = function() {
		var str = tel.value;
		var reg =  /^[0-9]{6}$/;
	}
	// 用户
	phoneNum.onfocus = function() {
		inputRemind.innerHTML = "“ 用户名只能用 中文、英文、数字、下划线、4-16个字符 ”";
	}
	phoneNum.onblur = function() {
		var str = phoneNum.value;
		var reg =  /^[\w\u4e00-\u9fa5\-]{4,16}$/;
		if(str != '') {
			if(!reg.test(str)) {
				remindInfo.style.display = 'block';
				remindInfo.style.color = "#CC0000";
				remindInfo.innerHTML = '<span></span>格式有误';
				remindInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
				phoneFlag = false;
			}else{
				remindInfo.style.display = 'block';
				remindInfo.innerHTML = '<span></span>正确';
				remindInfo.style.color = "black"
				inputRemind.innerHTML = "";
				remindInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -160px";
				phoneFlag = true;
			}
		}else{
			inputRemind.innerHTML = " 请填写用户名";
			remindInfo.style.display = 'none';
			phoneFlag = false;
		}
		
	}
	// 输入密码
	var passNum = document.getElementsByClassName('x_input_pass')[0];
	var passInfo = document.getElementsByClassName('x_pass_info')[0];
	var errInfo = document.getElementsByClassName('x_remindp')[0];
	passNum.onfocus = function() {
		passInfo.innerHTML = "“ 长度在6-18之间，建议由字母、数字与符号两种以上组成 ”";
	}
	passNum.onblur = function() {
		var str = passNum.value;
		var reg = /^[\w\-\?\#\*\.\+\$\%\&\^\!\@\(\)\=\~]{6,18}$/;
		if(str != '') {
			if(!reg.test(str)) {
				errInfo.style.display = 'block';
				errInfo.style.color = "#CC0000";
				errInfo.innerHTML = '<span></span>格式有误';
				errInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
				passFlag = false;
			}else{
				errInfo.style.display = 'block';
				errInfo.innerHTML = '<span></span>正确';
				errInfo.style.color = "black";
				passInfo.innerHTML = "";
				errInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -160px";
				passFlag = true;
			}
		}else{
			passInfo.innerHTML = "请填写密码";
			passFlag = false;
		}
		
	}
	// 再次判断密码
	var repass = document.getElementsByClassName('x_reinput')[0];
	var passAgain = document.getElementsByClassName('x_pass_again')[0];
	var passAgainInfo = document.getElementsByClassName('x_repassAgain')[0];
	repass.onblur = function() {
		if(repass.value != '') {
			if(repass.value == passNum.value) {
				if(passFlag == true) {
					passAgainInfo.style.display = 'block';
					passAgainInfo.innerHTML = '<span></span>正确';
					passAgainInfo.style.color = "black";
					passAgainInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -160px";
					passAgain.innerHTML = "";
					repassFlag = true;
				}else{
					passAgainInfo.style.display = 'block';
					passAgainInfo.style.color = "#CC0000";
					passAgainInfo.innerHTML = '<span></span>格式错误';
					passAgainInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
					repassFlag = false;
				}
			}else {
				passAgainInfo.style.display = 'block';
				passAgainInfo.style.color = "#CC0000";
				passAgainInfo.innerHTML = '<span></span>两次密码不一致';
				passAgainInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
				passAgain.innerHTML = "再次输入密码";
				repassFlag = false;
			}
		}else{
			passAgain.innerHTML = "再次输入密码";
			repassFlag = false;
		}
		
	}
	// 验证码
	var picCode = document.getElementsByClassName("x_verification_code")[0];
	var picCodeInfo = document.getElementsByClassName("x_pic_code")[0];
	var verifyCode = new GVerify("v_container", "change_code");
	picCode.onblur = function() {
		if(picCode.value != '') {
			if(picCode.value.length == 4) {
				picCodeInfo.innerHTML = "";
			}else{
				picCodeInfo.innerHTML = "验证码格式错误";
				picCodeInfo.style.color = "#CC0000";
			}
		}else{

		}
		
	}
	// 短信
	var x_duan = document.getElementsByClassName("x_remind_mes")[0];

	$('#x_rigesterBtn').val('注册');
	// 点击注册
	document.getElementsByClassName("x_btn")[0].onclick = function() {
		if(x_duaninput == shortmessage) {
			resFlag = true;
		}else {
			resFlag = false;
		}
		var res = verifyCode.validate(document.getElementById("code_input").value);
		// 同意协议
		var argee = document.getElementById('ck');
		if(argee.checked == false) {
			alert('请先阅读用户协议');
		}else{
			if(res){
				if(repass.value == passNum.value) {
					if(phoneFlag == true && passFlag == true && repassFlag == true && telFlag == true && resFlag == true) {
						// 验证成功 发送ajax
						$.ajax({
							type: "post",
							url: "/api/register",
							data: {
								regusername : $('.x_input_text').val(),
								regpassword : $('.x_input_pass').val(),
								regrepassword : $('.x_reinput').val()
							},
							dataType : 'json',
							success: function(resData) {
//								console.log(resData.message)
								switch(resData.code) {
									case 5:
										$('#x_rigesterBtn').val('注册中...');
										window.location.href = "/api/login";
									break;
									case 4:
										phoneNum.focus();
										remindInfo.style.display = 'block';
										remindInfo.style.color = "#CC0000";
										remindInfo.innerHTML = '<span></span>该用户已注册';
										remindInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
										phoneFlag = false;
										// alert(resData.message)
									break;
								}
							}
						})
					}else{
						if(phoneFlag != true) {
							phoneNum.focus();
							remindInfo.style.display = 'block';
							remindInfo.style.color = "#CC0000";
							remindInfo.innerHTML = '<span></span>格式有误';
							remindInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
							inputRemind.innerHTML = " 请填写用户名";
							phoneFlag = false;
						}else if(passFlag != true) {
							passNum.focus();
							errInfo.style.display = 'block';
							errInfo.style.color = "#CC0000";
							errInfo.innerHTML = '<span></span>格式有误';
							errInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
							passInfo.innerHTML = "请填写密码";
							passFlag = false;
						}else if(repassFlag != true) {
							repass.focus();
							passAgainInfo.style.display = 'block';
							passAgainInfo.style.color = "#CC0000";
							passAgainInfo.innerHTML = '<span></span>两次密码不一致';
							passAgainInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
							passAgain.innerHTML = "再次输入密码";

							repassFlag = false;
						}else if(telFlag != true){
							telInfo.style.display = 'block';
							telInfo.style.color = "#CC0000";
							telInfo.innerHTML = '<span></span>格式有误';
							telInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
							telFlag = false;
							telWran.innerHTML = " 请填写手机号码";
						}else if(resFlag != true) {
							x_duan.style.display = 'block';
							x_duan.style.color = "#CC0000";
							x_duan.innerHTML = '<span></span>格式有误';
							x_duan.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
						}
						// successFlag = false;
					}
				}else{
					repass.focus();
					passAgainInfo.style.display = 'block';
					passAgainInfo.style.color = "#CC0000";
					passAgainInfo.innerHTML = '<span></span>两次密码不一致';
					passAgainInfo.children[0].style.background = "url(/public/images/regist2.jpg) no-repeat -154px -194px";
					passAgain.innerHTML = "再次输入密码";

					repassFlag = false;
				}
			}else{
				picCodeInfo.innerHTML = "验证码错误 请重新输入";
				picCodeInfo.style.color = "#CC0000";
				
			}
		}
	}






// }

